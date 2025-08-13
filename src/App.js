import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Addproduct from "./page/Addproduct";
import EmailVerify from "./page/EmailVerify";

function App() {
  return (
    
    <>
    
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/register" element={<Register />} />
     <Route path="/Dashboard" element={<Dashboard />} />
     <Route path="/login" element={<Login />} />
     <Route path="/email-verify" element={<EmailVerify />} />
     <Route path="/addproduct" element={<Addproduct />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
