# 🤝 Reach - Collaborative Help Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

**Reach** is a real-time web application that connects people needing assistance ("Receivers") with available experts ("Helpers"). It features a role-based dashboard, instant messaging via WebSockets, and a live status tracking system.

🔴 **Live Demo:** [https://reach-app.vercel.app](https://reach-eta.vercel.app/)

---

## ✨ Features Implemented

### 🎭 User Roles & Authentication
* **Dual Role System:** Users register as either a **Receiver** or a **Helper**.
* **Secure Auth:** JWT (JSON Web Token) authentication with `bcryptjs` password hashing.
* **Profile Management:** Users can update their bio, skills, profile picture, and social links.

### 📡 Real-Time Chat
* **Instant Messaging:** Powered by `socket.io` for zero-latency communication.
* **Chat History:** Persistent message storage in MongoDB.
* **Smart UI:** Dynamic header shows the chatting partner's name and avatar.
* **Rich Features:** Emoji picker integration and timestamped messages.

### 🖥️ Role-Specific Dashboards
**For Receivers:**
* **Helper Discovery:** Search and filter helpers by name or skill.
* **Request Management:** Send help requests with details and track their status (Pending/Accepted/Declined).
* **Status Indicators:** Visual cues for request states (Yellow/Green/Red).

**For Helpers:**
* **Availability Toggle:** Switch profile status between "Online" and "Busy" to control visibility.
* **Request Ticket System:** View incoming requests in a "Ticket" style layout.
* **Action Control:** Accept or Decline requests directly from the dashboard.
* **Tabbed View:** Separate views for "New Requests" and "Active Connections".

### ⚙️ Technical Highlights
* **Glassmorphism UI:** Custom-styled components using Tailwind CSS.
* **Toast Notifications:** Replaced default alerts with `react-hot-toast` for success/error feedback.
* **Environment Config:** Production-ready configuration separating Localhost and Cloud URLs.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Lucide React (Icons), Axios, Socket.io-client |
| **Backend** | Node.js, Express.js, Cors, Dotenv |
| **Database** | MongoDB (Mongoose ODM) |
| **Real-Time** | Socket.io (WebSockets) |
| **Deployment** | Frontend on **Vercel**, Backend on **Render**, Database on **MongoDB Atlas** |
---
