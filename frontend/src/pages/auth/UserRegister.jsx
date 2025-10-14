import React from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const password = e.target.password.value

        const response = await axios.post("http://localhost:3000/api/auth/user/register",{
            fullName: firstName+" "+lastName,
            email: email,
            password: password
        },{
            withCredentials:true
        })

        console.log(response.data);

        navigate("/")
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Create Your Account</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">Join to explore and enjoy delicious meals.</p>
        </header>
        <nav className="mb-8 text-base sm:text-lg text-gray-700 flex justify-center gap-6 font-medium">
          <span className="mr-2">Switch:</span>
          <Link to="/user/register" className="text-blue-600 hover:underline">User</Link>
          <span>•</span>
          <Link to="/food-partner/register" className="text-blue-600 hover:underline">Food Partner</Link>
        </nav>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="firstName"
                className="block text-base font-medium text-gray-700"
              >First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="lastName" className="block text-base font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doh"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="block text-base font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-300 active:scale-95"
          >Sign Up</button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-6">
          Already have an account? <Link to="/user/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
