import { useState } from "react";
import API from "../../api";
import "./index.css";

function Transfers() {
  const [form, setForm] = useState({
    assetName: "",
    quantity: "",
    fromBase: "",
    toBase: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await API.post("/transfers", form);
      alert("Transfer completed successfully");
      setForm({
        assetName: "",
        quantity: "",
        fromBase: "",
        toBase: ""
      });

    } catch (error) {
      alert("Error while transferring asset");
    }
  };

  return (
    <div className="trf-container">
      <div className="trf-card">
        <h2 className="trf-title">Asset Transfer</h2>

        <input
          type="text"
          name="assetName"
          placeholder="Asset Name"
          value={form.assetName}
          onChange={handleChange}
          className="trf-input"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="trf-input"
        />

        <input
          type="text"
          name="fromBase"
          placeholder="From Base"
          value={form.fromBase}
          onChange={handleChange}
          className="trf-input"
        />

        <input
          type="text"
          name="toBase"
          placeholder="To Base"
          value={form.toBase}
          onChange={handleChange}
          className="trf-input"
        />

        <button className="trf-btn" onClick={handleSubmit}>
          Transfer
        </button>
      </div>
    </div>
  );
}

export default Transfers;