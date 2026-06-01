import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login_style.css';
import vitLogo from '../assets/images/vitlogo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  /*useEffect(() => {
    // Initialization if needed
  }, []);*/

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      role: role,
      name: email.split("@")[0]
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    setMessage("Login successful! Redirecting...");

    setTimeout(() => {
      if (role === "student") {
        //browser immediately leaves current page and goes to the specified URL
        window.location.href = "/student-dashboard";
      } else if (role === "coordinator") {
        window.location.href = "/coordinator-dashboard";
      } else {
        window.location.href = "/admin-dashboard";
      }
    }, 1000);  //1000ms delay before redirecting
  };

  return (
    <>
      <header className="login-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src={vitLogo} alt="VIT Logo" className="vit-logo-header" />
            <span className="brand-name">VIT Portal</span>
          </Link>
        </div>
      </header>
      <section className="login-page">
        <div className="login-container">
          <h2>Login to Portal</h2>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select 
              id="role" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="coordinator">Coordinator</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button type="submit" className="login-submit">Login</button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          <p id="loginMessage">{message}</p>
        </form>
      </div>
    </section>
    </>
  );
};

export default Login;
