# 🚀 Fullstack App Setup

This project consists of a **Backend** (Node.js + Express + MongoDB) and a **Frontend** (React + Vite).  
Follow the instructions below to set up and run the application locally.

---

## 🧪 Environment Variables

### Backend (`/backend/.env`)

```env
PORT=5001
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET=your_stream_api_secret_here

SENTRY_DSN=your_sentry_dsn_here

INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here

CLIENT_URL=http://localhost:5173
Frontend (/frontend/.env)
env
Copy
Edit
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_STREAM_API_KEY=your_stream_api_key_here
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_API_BASE_URL=http://localhost:5001/api
🔧 Run the Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
💻 Run the Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
📂 Project Structure
bash
Copy
Edit
project-root/
│
├── backend/       # Express.js + MongoDB + Clerk + Inngest setup
│   ├── .env
│   ├── src/
│   └── package.json
│
├── frontend/      # React + Vite + Clerk + Stream integration
│   ├── .env
│   ├── src/
│   └── package.json
│
└── README.md
✅ Tech Stack
Backend: Node.js, Express, MongoDB, Clerk, Inngest

Frontend: React, Vite, Clerk, Stream

Monitoring: Sentry

🛠️ Commands Quick Reference
bash
Copy
Edit
# Git
git add .
git commit -m "your commit message"
git push origin main
📌 Notes
Make sure you create .env files in both backend/ and frontend/ before running the project.

Replace all your_*_here values with actual keys/secrets.

yaml
Copy
Edit

---

Do you want me to also include **deployment instructions** (like for Vercel + Render/Heroku) in this README?