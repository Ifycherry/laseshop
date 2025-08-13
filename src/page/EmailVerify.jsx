import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";



export default function EmailVerify() {
  //Capturing all user entries

  const [searchParams, setSearchParams] = useSearchParams();
  const searchEmail = searchParams.get('email');
  // console.log(email);
  const [formData, setFormData] = useState({
    code: "",
  });

  const handleChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  // console.log(formData)

  //const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({})



  // Validate User Entry
    const ValidateForm = () => {
      const newErrors = {};



    // // Validate email
    if(!formData.code.trim()) {
      newErrors.code = "Verification code is required";
    }
    setErrors(newErrors);
  //   console.log(newErrors);
     return Object.keys(newErrors).length === 0;
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!ValidateForm()) return;

  try {
    const response = await axios.post("http://laseappstore.test/api/verify", 
      {
      email: searchEmail,
      code: formData.code.trim(),
    }) 
    if(response.status === 200) {
      // console.log(response);
      setErrors("");
      alert(response.data.message);
      navigate("/login")
    }
  } catch (error) {
    //setErrors(error.response.data.errors);
    //alert(error.response.data.message);
    console.log(error);

    // Handle validation errors form laravel
    if (error.response?.status === 400){
        const responseData = error.response.data;
        if (responseData.errors) {
            setErrors(responseData.errors); //Expected: {code: "some error"}
        } else if (responseData.message) {
            // Graceful fallback if 'error' is undefined
            setErrors({code: responseData.message});
        } else {
        setErrors({code: "An unknown error occurred"});
    }
  } else {
       setErrors({code: "Serve error. please try again later"});
  }
  }
};
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <form
          action="method"
          className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verify Your Account
            </h2>
            <p className="text-gray-500 text-sm">Enter code sent to <span className="text-l text-blue-700">{searchEmail}</span></p>
          </div>
          <div className="space-y-4">
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Code
              </label>
              <input
                type="text"
                name="code"
                onChange={handleChange}
                value={formData.code}
                placeholder="johndoe@gmail.com"
                // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                className={`w-full px-4 py-3 rounded-lg border ${errors.code ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{errors.code}</span>
            </div>
            
                        
            <div> 
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md"
                        >
                Verify Account
              </button>
            </div>
            <div>
              <p>You dont have an account ? <Link to="/register" className="text-blue-600 hover:underline">Click here to register</Link></p>
            </div>
          </div>
        </form>
      </div>
  </>
);
}





