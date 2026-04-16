import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <div className="nav-left">
        <Link to="/" className="nav-logo">MAMS</Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>

        {(role === "Admin" || role === "Logistics") && (
          <Link to="/purchases" className="nav-link">Purchases</Link>
        )}

        {role === "Admin" && (
          <Link to="/transfers" className="nav-link">Transfers</Link>
        )}

        {(role === "Admin" || role === "Commander") && (
          <Link to="/assignments" className="nav-link">Assignments</Link>
        )}
      </div>

      <div className="nav-right">
        <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;