import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Cart from "./page/Cart";
import Register from "./page/Register";
import Login from "./page/Login";
import ItemView from "./page/ItemView";
import Dashboard from "./page/Dashboard";
import Addproduct from "./page/Addproduct";
import EmailVerify from "./page/EmailVerify";
import AdminDashboard from "./page/Admin/AdminDashboard";
import AdminUsers from "./page/Admin/AdminUsers";
import AdminEditUser from "./page/AdminEditUser";
import ForgetPassword from "./page/ForgetPassword";
import ChangePassword from "./page/ChangePassword";
import AdminProductsList from "./page/Admin/AdminProductsList";

function App() {
  return (
    
    <>
    
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/register" element={<Register />} />
     <Route path="/Dashboard" element={<Dashboard />} />
     <Route path="/login" element={<Login />} />
     <Route path="/itemview" element={<ItemView />} />
     <Route path="/forget-password" element={<ForgetPassword/>} />
     <Route path="/change-password" element={<ChangePassword/>}/>
     <Route path="/email-verify" element={<EmailVerify />} />
     <Route path="/addproduct" element={<Addproduct />} />
     <Route path="/admin/productslist" element={<AdminProductsList />} />
    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
    <Route path="/admin/users" element={<AdminUsers/>}/>
    <Route path="/admin/users/edit" element={<AdminEditUser />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
