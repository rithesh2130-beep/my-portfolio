import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Plus,
  Trash2,
  LogOut,
  Upload,
  Award,
  FolderGit2,
  Sparkles,
  PlusCircle,
  Pencil,
  Check,
  X,
  FileText,
  User,
  Settings,
} from "lucide-react";
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

interface ContentData {
  hero: {
    name: string;
    tagline: string;
    bio: string;
  };
  about: {
    headline: string;
    paragraph1: string;
    paragraph2: string;
    cta: string;
    stats: { value: string; label: string }[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
}

type TabType = "projects" | "certificates" | "about" | "contact";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [content, setContent] = useState<ContentData | null>(null);
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

  // Inline Edit Project States
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProject, setEditProject] = useState<Partial<Project>>({});

  // Certificate Form States
  const [cTitle, setCTitle] = useState("");
  const [cIssuer, setCIssuer] = useState("");
  const [cYear, setCYear] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cLink, setCLink] = useState("");
  const [cFile, setCFile] = useState<File | null>(null);

  // About / Content Edit States
  const [editContent, setEditContent] = useState<ContentData | null>(null);
  const [contentSaving, setContentSaving] = useState(false);

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

    fetch(`${API_BASE_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
        return Promise.all([
          fetch(`${API_BASE_URL}/api/projects`).then((r) => r.json()),
          fetch(`${API_BASE_URL}/api/certificates`).then((r) => r.json()),
          fetch(`${API_BASE_URL}/api/content`).then((r) => r.json()),
        ]);
      })
      .then(([projectsData, certsData, contentData]) => {
        setProjects(projectsData);
        setCertificates(certsData);
        setContent(contentData);
        setEditContent(JSON.parse(JSON.stringify(contentData)));
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
  /*  ADD PROJECT                                                        */
  /* ------------------------------------------------------------------ */
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDescription) {
      showStatus("Title and Description are required", "error");
      return;
    }
    setActionLoading(true);
    const token = localStorage.getItem("adminToken");
    const tagsArray = pTags.split(",").map((t) => t.trim()).filter((t) => t !== "");

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: pTitle, subtitle: pSubtitle, description: pDescription,
          tags: tagsArray, year: pYear, link: pLink, iconName: pIconName, isFeatured: pFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add project");
      setProjects([...projects, data]);
      showStatus("Project added successfully!", "success");
      setPTitle(""); setPSubtitle(""); setPDescription(""); setPTags("");
      setPYear(""); setPLink(""); setPIconName("Code2"); setPFeatured(false);
    } catch (err: any) {
      showStatus(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  EDIT PROJECT INLINE                                                */
  /* ------------------------------------------------------------------ */
  const startEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setEditProject({
      title: p.title, subtitle: p.subtitle, description: p.description,
      tags: p.tags, year: p.year, link: p.link, iconName: p.iconName, isFeatured: p.isFeatured,
    });
  };

  const handleSaveProject = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editProject),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setProjects(projects.map((p) => (p.id === id ? data : p)));
      setEditingProjectId(null);
      showStatus("Project updated!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  DELETE PROJECT                                                     */
  /* ------------------------------------------------------------------ */
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((p) => p.id !== id));
      showStatus("Project deleted!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  ADD CERTIFICATE                                                    */
  /* ------------------------------------------------------------------ */
  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle || !cIssuer || !cYear) {
      showStatus("Title, Issuer, and Year are required", "error");
      return;
    }
    setActionLoading(true);
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("title", cTitle);
    formData.append("issuer", cIssuer);
    formData.append("year", cYear);
    formData.append("description", cDescription);
    formData.append("credentialLink", cLink);
    if (cFile) formData.append("file", cFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add certificate");
      setCertificates([...certificates, data]);
      showStatus("Certificate uploaded successfully!", "success");
      setCTitle(""); setCIssuer(""); setCYear(""); setCDescription(""); setCLink(""); setCFile(null);
      const fi = document.getElementById("certFile") as HTMLInputElement;
      if (fi) fi.value = "";
    } catch (err: any) {
      showStatus(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  DELETE CERTIFICATE                                                 */
  /* ------------------------------------------------------------------ */
  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm("Delete this certificate?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete certificate");
      setCertificates(certificates.filter((c) => c.id !== id));
      showStatus("Certificate deleted!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  /* ------------------------------------------------------------------ */
  /*  SAVE CONTENT (ABOUT / CONTACT)                                    */
  /* ------------------------------------------------------------------ */
  const handleSaveContent = async (section: "hero" | "about" | "contact") => {
    if (!editContent) return;
    setContentSaving(true);
    const token = localStorage.getItem("adminToken");
    try {
      const payload = { [section]: editContent[section] };
      const res = await fetch(`${API_BASE_URL}/api/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setContent(data);
      setEditContent(JSON.parse(JSON.stringify(data)));
      showStatus("Content saved successfully!", "success");
    } catch (err: any) {
      showStatus(err.message, "error");
    } finally {
      setContentSaving(false);
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

  const inputCls =
    "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all bg-white";
  const textareaCls =
    "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none bg-white";
  const labelCls = "block text-xs font-bold uppercase text-slate-500 mb-1 mt-3";
  const saveBtnCls =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all disabled:opacity-50";

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    { id: "about", label: "About Section", icon: <User className="w-4 h-4" /> },
    { id: "contact", label: "Contact Info", icon: <Settings className="w-4 h-4" /> },
  ];

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
              className="inline-flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        {/* Status Toast */}
        {message && (
          <div
            className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold shadow-xl transition-all duration-300 ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                : "bg-rose-50 border-rose-100 text-rose-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 pb-px mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm -mb-px transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* PROJECTS TAB                                                  */}
        {/* ============================================================ */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Add Form */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <form onSubmit={handleAddProject} className="space-y-3">
                <div className="flex items-center gap-2 text-violet-600 mb-2">
                  <PlusCircle className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-slate-900">Add New Project</h3>
                </div>

                <div>
                  <label className={labelCls}>Title *</label>
                  <input type="text" value={pTitle} onChange={(e) => setPTitle(e.target.value)} placeholder="e.g. Drishta-AI" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Subtitle</label>
                  <input type="text" value={pSubtitle} onChange={(e) => setPSubtitle(e.target.value)} placeholder="e.g. AI Safety Platform" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Description *</label>
                  <textarea value={pDescription} onChange={(e) => setPDescription(e.target.value)} placeholder="Provide description..." rows={3} className={textareaCls} />
                </div>
                <div>
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input type="text" value={pTags} onChange={(e) => setPTags(e.target.value)} placeholder="React, Node.js, MongoDB" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Year</label>
                    <input type="text" value={pYear} onChange={(e) => setPYear(e.target.value)} placeholder="2026" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Icon</label>
                    <select value={pIconName} onChange={(e) => setPIconName(e.target.value)} className={inputCls}>
                      <option value="Code2">Code2</option>
                      <option value="Database">Database</option>
                      <option value="Activity">Activity</option>
                      <option value="Trophy">Trophy</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Project Link</label>
                  <input type="text" value={pLink} onChange={(e) => setPLink(e.target.value)} placeholder="https://github.com/..." className={inputCls} />
                </div>
                <div className="flex items-center gap-2 py-1">
                  <input type="checkbox" id="pFeatured" checked={pFeatured} onChange={(e) => setPFeatured(e.target.checked)} className="h-4 w-4 accent-violet-600 border-slate-300 rounded" />
                  <label htmlFor="pFeatured" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">Feature on Hero</label>
                </div>
                <button type="submit" disabled={actionLoading} className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all disabled:opacity-50 mt-1">
                  {actionLoading ? "Saving..." : "Add Project"}
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 px-1">
                Existing Projects ({projects.length})
              </h3>
              {projects.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400">
                  No projects found. Add one using the form.
                </div>
              ) : (
                projects.map((p) =>
                  editingProjectId === p.id ? (
                    /* ---- Inline Edit Card ---- */
                    <div key={p.id} className="bg-white border-2 border-violet-200 rounded-3xl p-5 shadow-md space-y-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-violet-600 uppercase tracking-wide">Editing Project</span>
                        <button onClick={() => setEditingProjectId(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <input value={editProject.title || ""} onChange={(e) => setEditProject({ ...editProject, title: e.target.value })} placeholder="Title" className={inputCls} />
                      <input value={editProject.subtitle || ""} onChange={(e) => setEditProject({ ...editProject, subtitle: e.target.value })} placeholder="Subtitle" className={inputCls} />
                      <textarea value={editProject.description || ""} onChange={(e) => setEditProject({ ...editProject, description: e.target.value })} rows={3} placeholder="Description" className={textareaCls} />
                      <input value={Array.isArray(editProject.tags) ? editProject.tags.join(", ") : ""} onChange={(e) => setEditProject({ ...editProject, tags: e.target.value.split(",").map((t) => t.trim()) })} placeholder="Tags (comma separated)" className={inputCls} />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editProject.year || ""} onChange={(e) => setEditProject({ ...editProject, year: e.target.value })} placeholder="Year" className={inputCls} />
                        <input value={editProject.link || ""} onChange={(e) => setEditProject({ ...editProject, link: e.target.value })} placeholder="GitHub link" className={inputCls} />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id={`feat-${p.id}`} checked={!!editProject.isFeatured} onChange={(e) => setEditProject({ ...editProject, isFeatured: e.target.checked })} className="h-4 w-4 accent-violet-600" />
                        <label htmlFor={`feat-${p.id}`} className="text-sm font-semibold text-slate-700">Featured</label>
                      </div>
                      <button onClick={() => handleSaveProject(p.id)} className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all">
                        <Check className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  ) : (
                    /* ---- Normal View Card ---- */
                    <div key={p.id} className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900">{p.title}</span>
                          {p.isFeatured && (
                            <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>
                          )}
                          <span className="text-xs text-slate-400">({p.year})</span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">{p.subtitle}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.tags?.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4 shrink-0">
                        <button onClick={() => startEditProject(p)} className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-100 transition-all">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProject(p.id)} className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CERTIFICATES TAB                                             */}
        {/* ============================================================ */}
        {activeTab === "certificates" && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <form onSubmit={handleAddCertificate} className="space-y-3">
                <div className="flex items-center gap-2 text-violet-600 mb-2">
                  <PlusCircle className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-slate-900">Upload Certificate</h3>
                </div>
                <div>
                  <label className={labelCls}>Title *</label>
                  <input type="text" value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="e.g. GCP Data Analytics" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Issuer *</label>
                  <input type="text" value={cIssuer} onChange={(e) => setCIssuer(e.target.value)} placeholder="e.g. Google" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Year *</label>
                  <input type="text" value={cYear} onChange={(e) => setCYear(e.target.value)} placeholder="e.g. 2026" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Description</label>
                  <textarea value={cDescription} onChange={(e) => setCDescription(e.target.value)} placeholder="Description of certification..." rows={2} className={textareaCls} />
                </div>
                <div>
                  <label className={labelCls}>Credential URL</label>
                  <input type="text" value={cLink} onChange={(e) => setCLink(e.target.value)} placeholder="https://coursera.org/verify/..." className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Upload Certificate File</label>
                  <input type="file" id="certFile" accept=".pdf,image/*" onChange={(e) => setCFile(e.target.files ? e.target.files[0] : null)} className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" />
                </div>
                <button type="submit" disabled={actionLoading} className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all disabled:opacity-50 mt-1">
                  {actionLoading ? "Uploading..." : "Save Certificate"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 px-1">
                Existing Certificates ({certificates.length})
              </h3>
              {certificates.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-400">
                  No certificates found. Upload one using the form.
                </div>
              ) : (
                certificates.map((c) => (
                  <div key={c.id} className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{c.title}</span>
                        <span className="text-xs text-slate-400">({c.year})</span>
                      </div>
                      <p className="text-sm text-slate-400 font-semibold">{c.issuer}</p>
                      {c.fileUrl && (
                        <a href={`${API_BASE_URL}${c.fileUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-violet-600 hover:underline mt-1 font-semibold">
                          <Upload className="w-3.5 h-3.5" /> View Uploaded File
                        </a>
                      )}
                      {c.credentialLink && (
                        <a href={c.credentialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:underline mt-1 font-semibold ml-4">
                          <FileText className="w-3.5 h-3.5" /> View Credential
                        </a>
                      )}
                    </div>
                    <button onClick={() => handleDeleteCertificate(c.id)} className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all ml-4 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ABOUT SECTION TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "about" && editContent && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-violet-600 mb-4">
                <User className="w-5 h-5" />
                <h3 className="font-display font-bold text-xl text-slate-900">Edit About Section</h3>
              </div>

              <p className="text-xs text-slate-400 mb-4">Changes will reflect live on the portfolio's About section.</p>

              <label className={labelCls}>Section Headline</label>
              <input
                value={editContent.about.headline}
                onChange={(e) => setEditContent({ ...editContent, about: { ...editContent.about, headline: e.target.value } })}
                className={inputCls}
                placeholder="Main heading for about section"
              />

              <label className={labelCls}>Paragraph 1</label>
              <textarea
                rows={4}
                value={editContent.about.paragraph1}
                onChange={(e) => setEditContent({ ...editContent, about: { ...editContent.about, paragraph1: e.target.value } })}
                className={textareaCls}
              />

              <label className={labelCls}>Paragraph 2</label>
              <textarea
                rows={4}
                value={editContent.about.paragraph2}
                onChange={(e) => setEditContent({ ...editContent, about: { ...editContent.about, paragraph2: e.target.value } })}
                className={textareaCls}
              />

              <label className={labelCls}>Call to Action Text</label>
              <input
                value={editContent.about.cta}
                onChange={(e) => setEditContent({ ...editContent, about: { ...editContent.about, cta: e.target.value } })}
                className={inputCls}
                placeholder="e.g. Let's ship something great together."
              />

              <div className="border-t border-slate-100 pt-5 mt-5">
                <p className="text-xs font-bold uppercase text-slate-500 mb-3">Stats Cards (3 fixed slots)</p>
                <div className="grid grid-cols-3 gap-3">
                  {editContent.about.stats.map((stat, i) => (
                    <div key={i} className="space-y-1.5">
                      <input
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...editContent.about.stats];
                          newStats[i] = { ...newStats[i], value: e.target.value };
                          setEditContent({ ...editContent, about: { ...editContent.about, stats: newStats } });
                        }}
                        placeholder="Value"
                        className={inputCls + " text-center font-bold"}
                      />
                      <input
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...editContent.about.stats];
                          newStats[i] = { ...newStats[i], label: e.target.value };
                          setEditContent({ ...editContent, about: { ...editContent.about, stats: newStats } });
                        }}
                        placeholder="Label"
                        className={inputCls + " text-center text-xs"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button onClick={() => handleSaveContent("about")} disabled={contentSaving} className={saveBtnCls}>
                  <Check className="w-4 h-4" />
                  {contentSaving ? "Saving..." : "Save About Section"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CONTACT INFO TAB                                             */}
        {/* ============================================================ */}
        {activeTab === "contact" && editContent && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-violet-600 mb-4">
                <Settings className="w-5 h-5" />
                <h3 className="font-display font-bold text-xl text-slate-900">Edit Contact Info</h3>
              </div>

              <p className="text-xs text-slate-400 mb-4">Update your contact details. These appear in the Contact section and sidebar.</p>

              <label className={labelCls}>Email</label>
              <input
                value={editContent.contact.email}
                onChange={(e) => setEditContent({ ...editContent, contact: { ...editContent.contact, email: e.target.value } })}
                className={inputCls}
                placeholder="your@email.com"
              />

              <label className={labelCls}>GitHub URL</label>
              <input
                value={editContent.contact.github}
                onChange={(e) => setEditContent({ ...editContent, contact: { ...editContent.contact, github: e.target.value } })}
                className={inputCls}
                placeholder="https://github.com/..."
              />

              <label className={labelCls}>LinkedIn URL</label>
              <input
                value={editContent.contact.linkedin}
                onChange={(e) => setEditContent({ ...editContent, contact: { ...editContent.contact, linkedin: e.target.value } })}
                className={inputCls}
                placeholder="https://linkedin.com/in/..."
              />

              <label className={labelCls}>Location</label>
              <input
                value={editContent.contact.location}
                onChange={(e) => setEditContent({ ...editContent, contact: { ...editContent.contact, location: e.target.value } })}
                className={inputCls}
                placeholder="e.g. India"
              />

              <div className="pt-4">
                <button onClick={() => handleSaveContent("contact")} disabled={contentSaving} className={saveBtnCls}>
                  <Check className="w-4 h-4" />
                  {contentSaving ? "Saving..." : "Save Contact Info"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
