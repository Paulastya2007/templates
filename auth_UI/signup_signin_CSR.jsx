/*
========================================================
AUTH PAGE - NEXT.JS / REACT VERSION
========================================================

STACK:
- Next.js / React
- Bootstrap 5
- Supports:
    (A) Custom Backend (Flask / Express / Rust / etc.)
    (B) Firebase Authentication

========================================================
BOOTSTRAP INSTALLATION
========================================================

1) Install Bootstrap:

   npm install bootstrap

2) Import Globally:

If using Next.js App Router (app/ folder):

   File: app/layout.js

   Add at the top:
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';

If using Pages Router (pages/ folder):

   File: pages/_app.js

   Add at the top:
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';

Bootstrap is now available globally.

========================================================
MODE A — USING YOUR OWN BACKEND
========================================================

Backend must expose:

   POST /login
   POST /signup

Fields sent:

LOGIN:
   - email
   - password

SIGNUP:
   - name
   - email
   - password

If your backend uses different routes
(example: /api/login),
change the fetch() URLs in the handlers.

If backend runs on another port:
   fetch("http://localhost:5000/login")

Enable CORS on backend if needed.

========================================================
MODE B — USING FIREBASE AUTHENTICATION
========================================================

If you are using Firebase instead of a custom backend:

1) Install Firebase:

   npm install firebase

2) Create Firebase config file:

   File: lib/firebase.js

   Initialize Firebase using credentials from:
   https://console.firebase.google.com

3) Replace fetch() login/signup handlers with:

   signInWithEmailAndPassword()
   createUserWithEmailAndPassword()

4) No /login or /signup backend routes are needed.

Firebase handles:
   - Password hashing
   - Authentication
   - Session management
   - JWT token issuing

5) After login:

   auth.currentUser gives current user.

6) If you also have your own backend
   (for files, database, etc.):

   - Get Firebase ID token:
       await user.getIdToken()

   - Send token to your backend
   - Backend verifies token using Firebase Admin SDK

========================================================
ARCHITECTURE SUMMARY
========================================================

OPTION 1:
Frontend → POST → Your Backend → Database

OPTION 2:
Frontend → Firebase SDK → Google Auth Servers

OPTION 3 (Hybrid - Recommended for production):
Frontend → Firebase → ID Token → Your Backend → Files/DB

========================================================
END OF GUIDE
========================================================
*/

"use client";

import { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");

  // ==============================
  // LOGIN HANDLER
  // ==============================
  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const response = await fetch("/login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setError("Invalid email or password");
    }
  }

  // ==============================
  // SIGNUP HANDLER
  // ==============================
  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const response = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setError("Signup failed");
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body">

          {/* ==============================
              ERROR DISPLAY
              Backend should return non-200
              if login/signup fails
          ============================== */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="text-center mb-4">
            <h3>File Server</h3>
            <p className="text-muted mb-0">Local secure access</p>
          </div>

          {/* ==============================
              TAB SWITCHER
          ============================== */}
          <ul className="nav nav-tabs mb-3 justify-content-center">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                Signup
              </button>
            </li>
          </ul>

          {/* ==============================
              LOGIN FORM
          ============================== */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>
            </form>
          )}

          {/* ==============================
              SIGNUP FORM
          ============================== */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                Create Account
              </button>
            </form>
          )}

        </div>

        <div className="card-footer text-center small text-muted">
          Local instance • No external services
        </div>
      </div>
    </div>
  );
}
