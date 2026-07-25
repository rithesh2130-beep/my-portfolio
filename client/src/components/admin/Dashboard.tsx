import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Trash2, LogOut, Upload, Award, FolderGit2, Sparkles, PlusCircle } from "lucide-react";
import { API_BASE_URL } from "../../config";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  iconName: string;
  isFeatured: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  fileUrl: string;
  credentialLink: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [, setLocation] = useLocation();

  // Project Form States
  const [pTitle, setPTitle] = useState("");
  const [pSubtitle, setPSubtitle] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pTags, setPTags] = useState("");
  const [pYear, setPYear] = useState("");
  const [pLink, setPLink] = useState("");
  const [pIconName, setPIconName] = useState("Code2");
  const [pFeatured, setPFeatured] = useState(false);

  // Certificate Form States
  const [cTitle, setCTitle] = useState("");
  const [cIssuer, setCIssuer] = useState("");
  const [cYear, setCYear] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cLink, setCLink] = useState("");
  const [cFile, setCFile] = useState<File | null>(null);

  // Status/Messages
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Verification & Fetching
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin");
      return;
    }

    // Verify authentication
    fetch(`${API_BASE_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then(data => {
        setUsername(data.username);
        // Authenticated, load data
        return Promise.all([
          fetch(`${API_BASE_URL}/api/projects`).then(res => res.json()),
          fetch(`${API_BASE_URL}/api/certificates`).then(res => res.json())
        ]);
      })
      .then(([projectsData, certsData]) => {
        setProjects(projectsData);
        setCertificates(certsData);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        setLocation("/admin");
      });
  }, [setLocation]);

  const showStatus = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setLocation("/admin");
  };

  /* ------------------------------------------------------------------ */
  /*  ADD OPERATIONS                                                    */
  /* ------------------------------------------------------------------ */
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDescription) {
      showStatus("Title and Description are required", "error");
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("adminToken");
    const tagsArray = pTags.split(",").map(t => t.trim()).filter(t => t !== "");

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: pTitle,
          subtitle: pSubtitle,
          description: pDescription,
          tags: tagsArray,
          year: pYear,
          link: pLink,
          iconName: pIconName,
          isFeatured: pFeatured
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add project");

      setProjects([...projects, data]);
      showStatus("Project added successfully!", "success");
      
      // Reset Form
      setPTitle("");
      setPSubtitle("");
      setPDescription("");
      setPTags("");
      setPYear("");
      setPLink("");
      setPIconName("Code2");
      setPFeatured(false);
    } catch (err: any) {
      showStatus(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle || !cIssuer || !cYear) {
      showStatus("Title, Issuer, and Year are required", "error");
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("adminToken");

    // Use FormData for file upload
    const formData = new FormData();
    formData.append("title", cTitle);
    formData.append("issuer", cIssuer);
    formData.append("year", cYear);
    formData.append("description", cDescription);
    formData.append("credentialLink", cLink);
    if (cFile) {
      formData.append("file", cFile);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add certificate");

      setCertificates([...certificates, data]);
      showStatus("Certificate uploaded successfully!", "success");

      // Reset Form
      setCTitle("");
      setCIssuer("");
      setCYear("");
      setCDescription("");
      setCLink("");
      setCFile(null);
      // Reset input element
      const fileInput = document.getElementById("certFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      showStatus(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  DELETE OPERATIONS                                                 */
  /* ------------------------------------------------------------------ */
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter(p => p.id !== id));
      showStatus("Project deleted successfully!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete certificate");

      setCertificates(certificates.filter(c => c.id !== id));
      showStatus("Certificate deleted successfully!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-500 text-sm font-semibold">Verifying Auth Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm shadow-slate-100/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900">Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              Logged in as: {username}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 px-4.5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-6 mt-10">
        {/* Status Toast */}
        {message && (
          <div
            className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold shadow-xl transition-all duration-300 animate-slide-in ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                : "bg-rose-50 border-rose-100 text-rose-600"
            }`}
          >
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-4 border-b border-slate-200 pb-px mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm -mb-px transition-all ${
              activeTab === "projects"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub Projects</span>
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm -mb-px transition-all ${
              activeTab === "certificates"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Uploaded Certificates</span>
          </button>
        </div>

        {/* Dynamic Panels */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Columns (Form) */}
          <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            {activeTab === "projects" ? (
              // ---- Add Project Form ----
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="flex items-center gap-2 text-violet-600 mb-2">
                  <PlusCircle className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-slate-900">Add New Project</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title *</label>
                  <input
                    type="text"
                    value={pTitle}
                    onChange={e => setPTitle(e.target.value)}
                    placeholder="e.g. Drishta-AI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={pSubtitle}
                    onChange={e => setPSubtitle(e.target.value)}
                    placeholder="e.g. AI Safety Platform"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description *</label>
                  <textarea
                    value={pDescription}
                    onChange={e => setPDescription(e.target.value)}
                    placeholder="Provide description..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={pTags}
                    onChange={e => setPTags(e.target.value)}
                    placeholder="Python, React, GCP"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Year</label>
                    <input
                      type="text"
                      value={pYear}
                      onChange={e => setPYear(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Lucide Icon</label>
                    <select
                      value={pIconName}
                      onChange={e => setPIconName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                    >
                      <option value="Code2">Code2</option>
                      <option value="Database">Database</option>
                      <option value="Activity">Activity</option>
                      <option value="Trophy">Trophy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Project Link</label>
                  <input
                    type="text"
                    value={pLink}
                    onChange={e => setPLink(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="pFeatured"
                    checked={pFeatured}
                    onChange={e => setPFeatured(e.target.checked)}
                    className="h-4.5 w-4.5 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                  />
                  <label htmlFor="pFeatured" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">
                    Feature on Home Hero
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Add Project"}
                </button>
              </form>
            ) : (
              // ---- Add Certificate Form ----
              <form onSubmit={handleAddCertificate} className="space-y-4">
                <div className="flex items-center gap-2 text-violet-600 mb-2">
                  <PlusCircle className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-slate-900">Upload Certificate</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title *</label>
                  <input
                    type="text"
                    value={cTitle}
                    onChange={e => setCTitle(e.target.value)}
                    placeholder="e.g. GCP Data Analytics Certificate"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Issuer *</label>
                  <input
                    type="text"
                    value={cIssuer}
                    onChange={e => setCIssuer(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Year *</label>
                  <input
                    type="text"
                    value={cYear}
                    onChange={e => setCYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description</label>
                  <textarea
                    value={cDescription}
                    onChange={e => setCDescription(e.target.value)}
                    placeholder="Description of certification..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Credential URL</label>
                  <input
                    type="text"
                    value={cLink}
                    onChange={e => setCLink(e.target.value)}
                    placeholder="https://coursera.org/verify/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Upload Certificate File</label>
                  <div className="relative mt-1">
                    <input
                      type="file"
                      id="certFile"
                      accept=".pdf,image/*"
                      onChange={e => setCFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all disabled:opacity-50"
                >
                  {actionLoading ? "Uploading..." : "Save Certificate"}
                </button>
              </form>
            )}
          </div>

          {/* Right Columns (Data List) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 px-2">
              Existing {activeTab === "projects" ? "GitHub Projects" : "Certificates"} ({activeTab === "projects" ? projects.length : certificates.length})
            </h3>

            {activeTab === "projects" ? (
              // ---- Projects List ----
              <div className="space-y-3.5">
                {projects.length === 0 ? (
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400">
                    No projects found. Use the form on the left to add one!
                  </div>
                ) : (
                  projects.map(p => (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-100 rounded-3xl p-5.5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{p.title}</span>
                          {p.isFeatured && (
                            <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                          <span className="text-xs text-slate-400">({p.year})</span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">{p.subtitle}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all ml-4 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // ---- Certificates List ----
              <div className="space-y-3.5">
                {certificates.length === 0 ? (
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400">
                    No certificates found. Use the form on the left to upload one!
                  </div>
                ) : (
                  certificates.map(c => (
                    <div
                      key={c.id}
                      className="bg-white border border-slate-100 rounded-3xl p-5.5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{c.title}</span>
                          <span className="text-xs text-slate-400">({c.year})</span>
                        </div>
                        <p className="text-sm text-slate-400 font-semibold">{c.issuer}</p>
                        {c.fileUrl && (
                          <a
                            href={`${API_BASE_URL}${c.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-violet-600 hover:underline mt-1 font-semibold"
                          >
                            <Upload className="w-3.5 h-3.5" /> View Uploaded File
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteCertificate(c.id)}
                        className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all ml-4 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
