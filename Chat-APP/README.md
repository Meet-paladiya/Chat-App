# 💬 Real-Time Chat Application

A full-stack, real-time messaging application built with the **MERN** stack (MongoDB, Express, React, Node.js), **Socket.io**, and **Tailwind CSS**. Features instant messaging, online user presence tracking, profile management with image uploads via Cloudinary, unread message badges, and robust JWT-based authentication.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://chat-app-henna-three-26.vercel.app](https://chat-app-henna-three-26.vercel.app)
- **Backend (Render):** [https://chat-app-8xiz.onrender.com](https://chat-app-8xiz.onrender.com)

---

## ✨ Features

- **⚡ Real-Time Messaging:** Instant peer-to-peer chat powered by Socket.io WebSockets.
- **🟢 Live Online/Offline Status:** Dynamic presence detection showing active users in real-time.
- **🔔 Unread Message Counter:** Real-time badge counter for unread messages per user conversation.
- **🔐 Secure Authentication:** JWT (JSON Web Token) authentication with persistent sessions (LocalStorage & Bearer token header) and bcrypt password hashing.
- **🖼️ Profile & Media Uploads:** User profile avatar management powered by Cloudinary image hosting.
- **📱 Responsive UI:** Clean, modern dark-themed glassmorphism interface built with Tailwind CSS.
- **🛡️ Cross-Origin & Production Ready:** CORS pre-configured for multi-platform deployments (Vercel + Render).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Real-Time Client:** Socket.io Client
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **WebSockets:** Socket.io
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (jsonwebtoken) & bcrypt
- **Media Storage:** Cloudinary SDK

---

## 📂 Project Structure

```text
Chat-APP/
├── backend/
│   ├── controller/          # Request handlers (auth, messages, users)
│   ├── lib/                 # DB connection, Cloudinary config, JWT utils
│   ├── middleware/          # Auth protection middleware
│   ├── model/               # Mongoose schemas (User, Message)
│   ├── route/               # Express API routes
│   ├── server.js            # Server entry point & Socket.io server
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI components (Sidebar, ChatContainer, etc.)
│   │   ├── context/         # React Contexts (AuthContext, ChatContext)
│   │   ├── pages/           # Pages (HomePage, LoginPage, ProfilePage)
│   │   ├── routers/         # App routing configuration
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # App entry point
│   ├── vercel.json          # Vercel SPA rewrites
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
ACCESS_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=https://chat-app-henna-three-26.vercel.app
```

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory:

```env
VITE_BACKEND_URL=https://chat-app-8xiz.onrender.com
```
*(For local development, set `VITE_BACKEND_URL=http://localhost:5000`)*

---

## 💻 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Meet-paladiya/Chat-App.git
cd Chat-App
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Ensure backend/.env is populated
npm run dev
```
The backend server will start at `http://localhost:5000`.

### 3. Setup the Frontend
In a new terminal window:
```bash
cd frontend
npm install
# Ensure frontend/.env points to your backend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

### Auth Endpoints (`/api/auth`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in user & receive token | No |
| `GET` | `/api/auth/logout` | Log out user & clear session | No |
| `GET` | `/api/auth/check` | Verify current session/user | Yes |
| `PUT` | `/api/auth/updateProfile`| Update user bio, name, or avatar | Yes |

### Message Endpoints (`/api/messages`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/messages/users` | Get all users for sidebar & unread count | Yes |
| `GET` | `/api/messages/:id` | Fetch conversation history with a user | Yes |
| `POST` | `/api/messages/send/:id`| Send a message (text or image) | Yes |
| `PUT` | `/api/messages/mark/:id`| Mark messages as read | Yes |

---

## 🚀 Deployment Guide

### Backend on Render (Web Service)
1. Create a new **Web Service** on [Render](https://dashboard.render.com).
2. Connect your GitHub repository.
3. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add all backend environment variables in the **Environment** tab (`MONGODB_URI`, `ACCESS_SECRET`, `CLOUDINARY_*`, `NODE_ENV=production`, `CLIENT_URL`).
5. Ensure your **MongoDB Atlas Network Access** allows `0.0.0.0/0` (all IPs).

### Frontend on Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Configure project settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
3. Add Environment Variable:
   - `VITE_BACKEND_URL`: `https://your-backend.onrender.com` (no trailing slash).
4. Deploy!

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
