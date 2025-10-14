import React, { useState } from "react";
import Header from "../components/Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import imageavatar from "../assets/imageavator.jpg";

export default function Register() {
  // Handle file upload
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(image);
  };
  

  //Capturing all user entries
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  // console.log(formData)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);

    try {
      const response = await axios.post(
        "http://laseappstore.test/api/register",
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          phone_number: formData.phone_number,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          role: formData.role,
          image: image,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFile(null);
      setImage(null);
      setErrors({
        image: "",
      });
      if (response.status === 201) {
        // console.log(response);
        setErrors({});
        alert(response.data.message);
        navigate(`/email-verify?email=${formData.email}`);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
     console.log(error.response.data.errors)
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <form
          //action="method"
          className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          onSubmit={handleSubmit} encType="multipart/form-data"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Register Now
            </h2>
            <p className="text-gray-500 text-sm">Create New Acccount</p>
          </div>
          <div className="space-y-4">
            <div>
              <figure className="max-w-lg">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={file || imageavatar}
                  alt="upload profice"
                  accept="image/png, image/jpg, image/jpeg"
                />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 dark:text-red-400{error.image">
                  Image caption
                </figcaption>
              </figure>

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload file
              </label>
              <input
              onChange={handleUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </div>
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                Firstname
              </label>
              <input
                type="text"
                name="firstname"
                onChange={handleChange}
                value={formData.firstname}
                placeholder="John"
                //className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                className={`w-full px-4 py-3 rounded-lg border 
                  ${
                  errors.lastname ? "border-red-500" : "border-gray-20 "
                } 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{errors.firstname}</span>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Lastname
              </label>
              <input
                type="text"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
                placeholder="Doe"
                // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.lastname ? "border-red-500" : "border-gray-200 "
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{errors.lastname}</span>
            </div>
            <div>
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-200 "
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{errors.email}</span>
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tell"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
                placeholder="+234703456789"
                // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone_number ? "border-red-500" : "border-gray-200 "
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{errors.phone_number}</span>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-200 "
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
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
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  onChange={handleChange}
                  value={formData.confirm_password}
                  placeholder="Confirm Password"
                  // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirm_password
                      ? "border-red-500"
                      : "border-gray-200 "
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                />
                <button
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition-color"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <span className="text-red-500">{errors.confirm_password}</span>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                // className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.role ? "border-red-500" : "border-gray-200 "
                } focus:border-blue-500    focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              >
                <option>Select Role</option>
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
              </select>
              <span className="text-red-500">{errors.role}</span>
            </div>

            {/* <div>
              <input
                type="file"
                onChange={handleUpload}
                className={
                  "w-full px-4 py-3 rounded-lg border border-gray-200 foc us :border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-7"
                }
                id="file_input"
              />
              <span className="text-red-500">{errors.image[0]}</span>
              {file && <img src={file} alt="Uploaded preview" />}
            </div> */}

            <div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md">
                Register
              </button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Click here to login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
