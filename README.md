# Task 2 Do — Smart Task Management System

A full-stack task management web application built with **Django REST Framework** (backend) and **React + Vite** (frontend). Supports user registration, JWT authentication, and full CRUD operations on tasks with filtering by status and priority.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)

---

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Filter tasks by status (Pending / Completed) and priority (High / Medium / Low)
- Each task belongs to the authenticated user only
- React frontend with routing (Login, Register, Dashboard)
- CORS enabled for local development

---

## Tech Stack

**Backend**
- Python / Django 6.x
- Django REST Framework
- SimpleJWT (JSON Web Tokens)
- django-cors-headers
- SQLite (default database)

**Frontend**
- React 19 + Vite 8
- React Router DOM 7
- Axios

---

## Folder Structure

```
Task 2 Do/
├── manage.py
├── db.sqlite3
├── requirements.txt
├── README.md
│
├── taskmanagement/          # Django project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── tasks/                   # Django app — core logic
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py            # Task model
│   ├── serializers.py       # TaskSerializer
│   ├── views.py             # API views + JWT custom view
│   ├── urls.py              # App-level URL routing
│   └── migrations/
│       └── 0001_initial.py
│
└── frontend/                # React + Vite app
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── public/
    │   └── task-list.svg
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── components/
        │   └── Navbar.jsx
        └── templates/
            ├── login.jsx
            ├── Register.jsx
            └── dashboard.jsx
```

---

## Requirements

### Python (Backend)

```
Django>=6.0.4
djangorestframework>=3.15.0
djangorestframework-simplejwt>=5.3.0
django-cors-headers>=4.3.0
```

### Node.js (Frontend)

| Package | Version |
|---|---|
| react | ^19.2.5 |
| react-dom | ^19.2.5 |
| react-router-dom | ^7.15.0 |
| axios | ^1.16.0 |
| vite | ^8.0.10 |
| @vitejs/plugin-react | ^6.0.1 |

---

## Getting Started

### Backend Setup

1. **Clone the repository** and navigate to the project root.

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate      # macOS/Linux
   venv\Scripts\activate         # Windows
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`.

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/register/` | No | Register a new user |
| POST | `/api/login/` | No | Obtain JWT access + refresh tokens |
| POST | `/api/token/refresh/` | No | Refresh the access token |
| GET | `/api/tasks/` | Yes | List all tasks for the logged-in user |
| POST | `/api/tasks/` | Yes | Create a new task |
| GET | `/api/tasks/<id>/` | Yes | Retrieve a single task |
| PUT | `/api/tasks/<id>/` | Yes | Update a task |
| DELETE | `/api/tasks/<id>/` | Yes | Delete a task |

**Query parameters for `GET /api/tasks/`:**
- `?status=PENDING` or `?status=COMPLETED`
- `?priority=HIGH`, `?priority=MEDIUM`, or `?priority=LOW`

**Authentication:** Pass the JWT access token as a Bearer token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```
