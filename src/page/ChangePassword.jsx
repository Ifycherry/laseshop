import React from 'react'

export default function ChangePassword() {
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
              Login Now
            </h2>
            <p className="text-gray-500 text-sm">Access your account</p>
          </div>
          <div className="space-y-4">
            
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
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{errors.email}</span>
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
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md"
                        >
                Login
              </button>
            </div>
            <div>
              <p>You dont have an account ? <Link to="/register" className="text-blue-600 hover:underline">Click here to register</Link></p>
            </div>
            <div>
              <p> <Link to="/Forgetpassword" className="text-blue-600 hover:underline">forget Password</Link></p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
