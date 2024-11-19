import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
// import DashboardLayout from "./pages/Admin/DashboardLayout";
import SideMenuLayout from "./pages/Admin/SideMenu";
import Dashboard from "./pages/Admin/Dashboard";
// import Branch from "./pages/Growth & strategy/AddBranch";
import AllBranch from "./pages/Growth & strategy/AllBranches";
import UpdateBranch from "./pages/Growth & strategy/UpdateBranch";

function App() {
  

  return (
    <>
     <Routes>
    <Route path="/" element={<HomePage />} />

    {/* Admin Routes */}
    {/* <Route path="/admin" element={<DashboardLayout />}> */}
    <Route path="/admin" element={<SideMenuLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="branch" element={<AllBranch />} /> 
    <Route path="branch/update/:branchId" element={<UpdateBranch />} /> 
    </Route>
     </Routes>
    </>
  )
}

export default App
