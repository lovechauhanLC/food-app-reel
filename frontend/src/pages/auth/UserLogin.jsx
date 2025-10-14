import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        const response = await axios.post("http://localhost:3000/api/auth/user/login",{
            email:email,
            password :password
        },{
            withCredentialials: true
        })

        console.log(response);

        navigate("/")

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue your food journey.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 active:scale-95 transition">Sign In</button>
        </form>
        <div className="mt-4 text-center">
          New Here?{" "}
          <Link to="/user/register" className="text-blue-500 font-medium hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
