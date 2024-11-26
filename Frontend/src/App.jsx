import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
// import DashboardLayout from "./pages/Admin/DashboardLayout";
import SideMenuLayout from "./pages/Admin/SideMenu";
import Dashboard from "./pages/Admin/Dashboard";
import AllBranches from "./pages/Growth & strategy/AllBranches";
import UpdateBranch from "./pages/Growth & strategy/UpdateBranch";
import AddNewBranch from "./pages/Growth & strategy/AddNewBranch";

function App() {
  

  return (
    <>
     <Routes>
    <Route path="/" element={<HomePage />} />

    {/* Admin Routes */}
    {/* <Route path="/admin" element={<DashboardLayout />}> */}
    <Route path="/admin" element={<SideMenuLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="branch" element={<AllBranches />} /> 
    <Route path="add-branch" element={<AddNewBranch />} /> 
    {/* <Route path="add-new-branch" element={<AddNewBranch />} />  */}
    <Route path="branch/update/:branchId" element={<UpdateBranch />} /> 
    </Route>
     </Routes>
    </>
  )
}

export default App
