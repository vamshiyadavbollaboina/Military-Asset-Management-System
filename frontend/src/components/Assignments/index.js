import { useEffect, useState } from "react";
import API from "../../api";
import "./index.css";

function Assignments() {
  const [form, setForm] = useState({
    assetName: "",
    quantity: "",
    base: "",
    assignedTo: ""
  });

  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignments");
      setAssignments(res.data || []);
    } catch (err) {
      console.log("Error fetching assignments");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError("");

      const res = await API.post("/assignments", form);

      alert(res.data.message || "Asset assigned successfully");

      setForm({
        assetName: "",
        quantity: "",
        base: "",
        assignedTo: ""
      });

      fetchAssignments(); 

    } catch (error) {
      const msg =
        error.response?.data?.message || "Error assigning asset";

      setError(msg);
    }
  };

  const isDisabled =
    !form.assetName ||
    !form.quantity ||
    !form.base ||
    !form.assignedTo;

  return (
    <div className="assignment-container">
      <div className="assignment-card">
        <h2 className="title">Assign Asset</h2>
        <input
          name="assetName"
          placeholder="Asset Name"
          value={form.assetName}
          onChange={handleChange}
          className="input"
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="input"
        />

        <input
          name="base"
          placeholder="Base Location"
          value={form.base}
          onChange={handleChange}
          className="input"
        />

        <input
          name="assignedTo"
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={handleChange}
          className="input"
        />

        {error && <p className="error">{error}</p>}

        <button
          className="btn"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Assign
        </button>
      </div>

      <div className="assignment-list">
        <h3>Assignment History</h3>

        {assignments.length === 0 ? (
          <p>No assignments yet</p>
        ) : (
          <div className="card-container">
            {assignments.map(item => (
              <div className="card" key={item._id}>
                <h4>{item.assetName}</h4>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Base:</strong> {item.base}</p>
                <p><strong>Assigned To:</strong> {item.assignedTo}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Assignments;