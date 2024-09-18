import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  

  return (
    <>
     <Routes>
    <Route path="/" element={<HomePage />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<DashboardLayout/>}>
    <Route index element={<Dashboard />} />
    </Route>
     </Routes>
    </>
  )
}

export default App
