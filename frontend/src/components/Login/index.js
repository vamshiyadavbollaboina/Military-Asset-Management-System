import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      switch (response.data.role) {
        case "Admin":
          navigate("/transfers");
          break;
        case "Logistics":
          navigate("/purchases");
          break;
        case "Commander":
          navigate("/assignments");
          break;
        default:
          navigate("/");
      }

    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          className="login-input"
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;