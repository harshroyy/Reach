# 🤝 Reach - Real-Time Help Matching Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Reach** is a full-stack MERN application designed to bridge the gap between people seeking help and experts willing to assist. It features role-based dashboards, real-time messaging, and status management.

🔗 **Live Demo:** [https://reach-app.vercel.app](https://reach-eta.vercel.app/)

---

## 🚀 Key Features

### 👤 Role-Based System
* **Receiver:** Browse helpers, filter by skills, send detailed requests, and track status.
* **Helper:** Manage incoming requests, toggle "Available/Busy" status, and view active connections.

### 💬 Real-Time Chat System
* **Instant Messaging:** Powered by **Socket.io** for low-latency communication.
* **Rich Media:** Emoji support, message timestamps, and read receipts logic.
* **Secure:** End-to-end user identification with visual profiles in chat.

### 🛠️ Advanced Dashboard
* **Glassmorphism UI:** Modern, clean interface using Tailwind CSS.
* **Smart Filtering:** Search helpers by name or skill.
* **Ticket System:** Visual representation of requests with "Accept/Decline" workflows.

### 🔒 Security & Auth
* **JWT Authentication:** Secure login and session management.
* **Password Hashing:** Bcrypt encryption for user data safety.
* **Protected Routes:** Middleware to prevent unauthorized access.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Styling)
* Lucide React (Icons)
* Socket.io Client (Real-time comms)
* React Hot Toast (Notifications)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* Socket.io (WebSockets)
* JSON Web Token (Auth)

**Deployment:**
* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 📸 Screenshots

*(Add your screenshots here, e.g., /screenshots/dashboard.png)*

| Dashboard | Chat Interface |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/600x400?text=Dashboard+View) | ![Chat](https://via.placeholder.com/600x400?text=Chat+Interface) |

---

## 💻 Run Locally

Clone the project and follow these steps to set it up on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/reach-app.git](https://github.com/your-username/reach-app.git)
cd reach-app
