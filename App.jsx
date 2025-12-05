import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Insights from "./pages/Insights";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </>
  );
}

export default App;
