import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Branch from "./pages/Growth & strategy/AddBranch";

function App() {
  

  return (
    <>
     <Routes>
    <Route path="/" element={<HomePage />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<DashboardLayout/>}>
    <Route index element={<Dashboard />} />
    <Route path="branch" element={<Branch/>} /> 
    </Route>
     </Routes>
    </>
  )
}

export default App
