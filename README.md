# 💻 Pandi Rithesh Raja — MERN Stack & AI Developer Portfolio

An interactive, premium developer portfolio and administration panel tailored for a **MERN Stack & AI Developer**. Built from scratch to showcase engineering capabilities, academic milestones, and dynamic project integrations.

🌐 **Live Application:** `http://localhost:5173`
⚙️ **Backend Port:** `http://localhost:5001`

---

## ✨ Features

### 🎨 Design & Layout
* **Premium Emerald & Gold Palette:** A high-end developer theme completely customized to utilize emerald green as the primary identity color and warm gold/amber as secondary accents. No purple, blue, or pink.
* **Modular Multi-Page Routing:** Shifted from a scrolling single-page app (SPA) to distinct URL-based paths (`/`, `/about`, `/skills`, `/projects`, `/education`, `/contact`) powered by `wouter`.
* **Framer-Motion Transitions:** Smooth fade-and-slide motion transitions on page change.
* **Session-Cached Loading Animation:** High-performance pre-loader that runs once per tab session to keep subsequent navigation instantaneous.
* **Skeuomorphic Hanging ID Badge:** A custom 3D card hanging from a lanyard line that rotates and slides dynamically based on mouse movements with translation physics.
* **Background Particle Field & Spotlight:** Ambient floating background canvas points and a subtle cursor-tracking spotlight following mouse coordinates.

### 🛡️ Admin Dashboard (`/admin` & `/admin/dashboard`)
* **Secure Auth:** JWT-secured dashboard access with cryptographically hashed credential validation.
* **Content Management System:** Direct dashboard controls to update bio paragraphs, metrics, CTA buttons, and contact links stored in `server/data/content.json`.
* **Inline Project Editor:** Create new projects, delete projects, or edit fields (title, subtitle, description, tags, year, link) in real-time.
* **Certificate Manager:** Upload certificate attachments (.pdf, images) securely and associate them with titles, issuers, and years.

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Core:** React, TypeScript, Vite
* **Styling:** Tailwind CSS (v4)
* **Animation:** Framer Motion
* **Iconography:** Lucide React, FontAwesome, React Icons
* **Routing:** Wouter

### Backend (Server)
* **Core:** Node.js, Express
* **Database/Storage:** Local persistent JSON files (`projects.json`, `certificates.json`, `content.json`) with `fs/promises`
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js
* **Uploads:** Multer (multipart form handling)
* **Watcher:** Nodemon

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### 2. Install Dependencies
Run the install command from the root directory:
```bash
pnpm install
```

### 3. Start Development Servers
Run the development command to start both the React Vite frontend and the Express backend simultaneously:
```bash
pnpm dev
```
* **Frontend:** `http://localhost:5173/`
* **Backend:** `http://localhost:5001/`

---

## 🔒 Credentials
To access the developer administration dashboard and manage your portfolio content, go to `http://localhost:5173/admin` and use:
* **Username:** `Rithesh`
* **Password:** `Apple@1pd`

---

## 📂 Project Structure
```text
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/           # Login & Dashboard panels
│   │   │   └── sections/        # Section-specific views (Sidebar, TopNavbar, Hero, etc.)
│   │   ├── App.tsx              # Application shell & Routes configuration
│   │   ├── index.css            # Base Tailwind and global styling variables
│   │   └── main.tsx             # Entrypoint
│   └── package.json
│
├── server/                      # Node/Express Backend
│   ├── data/                    # JSON database storage
│   │   ├── content.json
│   │   ├── projects.json
│   │   └── certificates.json
│   ├── uploads/                 # Uploaded certificate documents
│   ├── index.js                 # API routing, controllers and multer uploads
│   └── package.json
│
└── package.json                 # Monorepo/Workspace config
```
