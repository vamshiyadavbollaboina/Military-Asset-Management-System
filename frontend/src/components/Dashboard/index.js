import { useEffect, useState } from "react";
import API from "../../api";
import "./index.css";

function Dashboard() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    API.get("/purchases")
      .then(res => setData(res.data))
      .catch(() => alert("Error fetching data"));
  }, []);

  const filtered = data.filter(item =>
    (item.assetName || "").toLowerCase().includes(filter.toLowerCase()) ||
    (item.base || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2 className="title">Dashboard</h2>

      <input
        className="search-input"
        placeholder="Search by asset or base..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="empty">No assets found</p>
      ) : (
        <div className="cards">
          {filtered.map(item => (
            <div className="card" key={item._id}>
              <h3>{item.assetName}</h3>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Base:</strong> {item.base}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;