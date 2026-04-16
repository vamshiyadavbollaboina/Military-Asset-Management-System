import { useState } from "react";
import API from "../../api";
import "./index.css";

function Purchases() {
  const [form, setForm] = useState({
    assetName: "",
    type: "",
    quantity: "",
    base: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await API.post("/purchases", form);
      alert("Purchase added successfully");
      
      setForm({
        assetName: "",
        type: "",
        quantity: "",
        base: ""
      });

    } catch (error) {
      alert("Error adding purchase");
    }
  };

  return (
    <div className="pur-container">
      <div className="pur-card">
        <h2 className="pur-title">Add Purchase</h2>

        <input
          type="text"
          name="assetName"
          placeholder="Asset Name"
          value={form.assetName}
          onChange={handleChange}
          className="pur-input"
        />

        <input
          type="text"
          name="type"
          placeholder="Type (Weapon, Vehicle, etc.)"
          value={form.type}
          onChange={handleChange}
          className="pur-input"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="pur-input"
        />

        <input
          type="text"
          name="base"
          placeholder="Base Location"
          value={form.base}
          onChange={handleChange}
          className="pur-input"
        />

        <button className="pur-btn" onClick={handleSubmit}>
          Add Purchase
        </button>
      </div>
    </div>
  );
}

export default Purchases;