# Military Asset Management System

A full-stack application to manage military assets, track purchases, assignments, and transfers across bases with role-based access control.

---

## Live Demo

- Backend API: https://military-asset-management-system-raa5.onrender.com
- Frontend API: https://military-asset-management-system-two.vercel.app

---

## Test Login Credentials

Use the following credentials to access the system:

### Admin
- Username: `admin`
- Password: `123`
- Role: `Admin`

### Commander
- Username: `commander`
- Password: `123`
- Role: `Commander`

### Logistics
- Username: `logistics`
- Password: `123`
- Role: `Logistics`

---

## Features

- JWT-based authentication
- Role-based access control (Admin / Commander / Logistics)
- Asset management (Add & view inventory)
- Purchase tracking (increase stock automatically)
- Asset assignment with availability validation
- Asset transfer between bases
- Inventory consistency checks

---

##  Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- Middleware-based RBAC

---

## API Routes Overview

### Auth
- `POST /login` → User login

---

### Assets / Purchases
- `POST /purchase` → Add purchase & update stock  
- `GET /purchase` → Get all assets  

---

### Assignments
- `GET /assignments` → View assignments (Admin, Commander)
- `POST /assignments` → Assign assets with stock validation  

---

### Transfers
- `POST /transfer` → Transfer assets between bases (Admin only)

---
