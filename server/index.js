import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || "pandi-rithesh-secret-key-123";

// Middleware
app.use(cors({
  origin: "*", // Adjust for specific production domains (e.g., Vercel) in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Paths
const DATA_DIR = path.join(__dirname, "data");
const UPLOADS_DIR = path.join(__dirname, "uploads");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const CERTIFICATES_FILE = path.join(DATA_DIR, "certificates.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

// Ensure directories exist
async function initFS() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    
    // Create default files if missing
    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      await fs.writeFile(PROJECTS_FILE, JSON.stringify([], null, 2));
    }
    
    try {
      await fs.access(CERTIFICATES_FILE);
    } catch {
      await fs.writeFile(CERTIFICATES_FILE, JSON.stringify([], null, 2));
    }

    try {
      await fs.access(ADMIN_FILE);
    } catch {
      // Default: username 'admin', password 'admin123'
      const hash = await bcrypt.hash("admin123", 10);
      await fs.writeFile(ADMIN_FILE, JSON.stringify({ username: "admin", passwordHash: hash }, null, 2));
    }
  } catch (err) {
    console.error("FS initialization error:", err);
  }
}

await initFS();

// Serve uploads static folder
app.use("/uploads", express.static(UPLOADS_DIR));

// Helper: Read JSON file
async function readDataFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper: Write JSON file
async function writeDataFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Multer Storage Configuration for Certificate Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).json({ error: "Access Denied: No Token Provided" });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid/Expired Token" });
    req.user = user;
    next();
  });
};

/* ------------------------------------------------------------------ */
/*  AUTH ROUTES                                                       */
/* ------------------------------------------------------------------ */
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const adminCreds = await readDataFile(ADMIN_FILE);
  if (username !== adminCreds.username) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const match = await bcrypt.compare(password, adminCreds.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "4h" });
  res.json({ token, username });
});

app.get("/api/admin/verify", authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

/* ------------------------------------------------------------------ */
/*  PROJECTS ROUTES                                                   */
/* ------------------------------------------------------------------ */
app.get("/api/projects", async (req, res) => {
  const projects = await readDataFile(PROJECTS_FILE);
  res.json(projects);
});

app.post("/api/projects", authenticateToken, async (req, res) => {
  const { title, subtitle, description, tags, year, link, iconName, iconBg, isFeatured } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const projects = await readDataFile(PROJECTS_FILE);
  const newProject = {
    id: "project-" + Date.now(),
    title,
    subtitle: subtitle || "",
    description,
    tags: Array.isArray(tags) ? tags : [],
    year: year || new Date().getFullYear().toString(),
    link: link || "",
    iconName: iconName || "Code2",
    iconBg: iconBg || "bg-primary/20 text-primary",
    isFeatured: !!isFeatured
  };

  projects.push(newProject);
  await writeDataFile(PROJECTS_FILE, projects);
  res.status(201).json(newProject);
});

app.delete("/api/projects/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const projects = await readDataFile(PROJECTS_FILE);
  const filtered = projects.filter(p => p.id !== id);
  
  if (projects.length === filtered.length) {
    return res.status(404).json({ error: "Project not found" });
  }

  await writeDataFile(PROJECTS_FILE, filtered);
  res.json({ message: "Project deleted successfully", id });
});

/* ------------------------------------------------------------------ */
/*  CERTIFICATES ROUTES                                               */
/* ------------------------------------------------------------------ */
app.get("/api/certificates", async (req, res) => {
  const certs = await readDataFile(CERTIFICATES_FILE);
  res.json(certs);
});

// Create Certificate with optional File Upload
app.post("/api/certificates", authenticateToken, upload.single("file"), async (req, res) => {
  const { title, issuer, year, credentialLink, description } = req.body;
  
  if (!title || !issuer || !year) {
    return res.status(400).json({ error: "Title, issuer, and year are required" });
  }

  let fileUrl = "";
  if (req.file) {
    // Save relative URL path for client requests
    fileUrl = `/uploads/${req.file.filename}`;
  }

  const certs = await readDataFile(CERTIFICATES_FILE);
  const newCert = {
    id: "cert-" + Date.now(),
    title,
    issuer,
    year,
    description: description || "",
    fileUrl,
    credentialLink: credentialLink || ""
  };

  certs.push(newCert);
  await writeDataFile(CERTIFICATES_FILE, certs);
  res.status(201).json(newCert);
});

app.delete("/api/certificates/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const certs = await readDataFile(CERTIFICATES_FILE);
  const cert = certs.find(c => c.id === id);
  
  if (!cert) {
    return res.status(404).json({ error: "Certificate not found" });
  }

  // Delete physical file if it exists and is local
  if (cert.fileUrl && cert.fileUrl.startsWith("/uploads/")) {
    const filename = cert.fileUrl.replace("/uploads/", "");
    const filepath = path.join(UPLOADS_DIR, filename);
    try {
      await fs.unlink(filepath);
    } catch (err) {
      console.warn(`Failed to delete file ${filepath}:`, err.message);
    }
  }

  const filtered = certs.filter(c => c.id !== id);
  await writeDataFile(CERTIFICATES_FILE, filtered);
  res.json({ message: "Certificate deleted successfully", id });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
