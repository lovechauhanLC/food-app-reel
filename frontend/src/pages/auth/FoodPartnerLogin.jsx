import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/create-food");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-md p-6 text-center">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Partner Login
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Access your dashboard and manage your food items.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm sm:text-base font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="business@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm sm:text-base font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm sm:text-base py-2.5 rounded-lg transition active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-600 text-sm sm:text-base mt-4">
          New partner?{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;