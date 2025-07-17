import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userType, setUserType] = useState("admin");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("userType", userType);
        navigate("/home");
      } else {
        alert(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="technician">Technician</option>
      </select>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
