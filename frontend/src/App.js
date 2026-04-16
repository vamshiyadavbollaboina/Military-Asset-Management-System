import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index";
import Dashboard from "./components/Dashboard/index";
import Purchases from "./components/Purchases/index";
import Transfers from "./components/Transfers/index";
import Assignments from "./components/Assignments/index";
import Login from "./components/Login/index";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </div>
    </>
  );
}

export default App;