import React, { useState } from "react";
import Header from "../components/Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {Link, useNavigate, useSearchParams} from "react-router-dom";



export default function Login() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({
    password: "",
    confirmed: "",
  });

  const handleChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({})



  // Validate User Entry
    const ValidateForm = () => {
      const newErrors = {};

    // // Validate email
    if(!formData.confirmed.trim()) {
      newErrors.email = "email address is required";
      }
    // // Validate password
      if(!formData.password) {
        newErrors.password = "password is required";
    
     }

    
    setErrors(newErrors);
  //   console.log(newErrors);
     return Object.keys(newErrors).length === 0;
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!ValidateForm()) return

  try{


    const response = await axios.post("http://laseappstore.test/api/changepassword", {
      password: formData.password,
      confirmed: formData.confirmed,
      email: email,
      token: token,
    }) 
    if(response.status === 200) {
    console.log(response);

      navigate('/login');
    }
  } catch (error) {
    setErrors(error.response.data.errors);
    console.log(errors);
    setMsg(error.response.data.message);
  }
};
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <form
          // action=""
          className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
            <p className="text-gray-500 text-sm">Enter a new password</p>
            <span className="text-red-500">{msg}</span>
          </div>
          <div className="space-y-4">
            
            {/* <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="johndoe@gmail.com"
                // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{errors.email}</span>
            </div> */}
            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

                />
                <button
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition-color"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <span className="text-red-500">{errors.password}</span>
            </div>
            <div>
              <label
                htmlFor="confirmed"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmed"
                  onChange={handleChange}
                  value={formData.confirmed}
                  placeholder="Password"
                  // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.confirmed ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

                />
                <button
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition-color"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <span className="text-red-500">{errors.password}</span>
            </div>
            
            <div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md"
                        >
                Change Password
              </button>
            </div>
            <div className="flex gap-5 text-lm">
             <Link to="/register" className="text-blue-600 hover:underline">Click here to register</Link>
              <Link to="/forget-password" className="text-blue-600 hover:underline">Check here to Change Password</Link>
            </div>
            
            
          </div>
        </form>
      </div>
    </>
);
}
