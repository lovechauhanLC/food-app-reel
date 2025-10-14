import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    await axios
      .post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          fullName: fullName, 
          contactName: contactName,
          phone: phone,
          address: address,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/create-food");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-blue-200 to-indigo-300 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Partner sign up
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Grow your business with our platform.
          </p>
        </header>
        <nav className="mb-6 text-lg sm:text-xl text-gray-600 text-center">
          <strong className="font-medium text-gray-700 mr-3">Switch:</strong> •{" "}
          <Link
            to="/user/register"
            className="text-blue-600 font-medium hover:underline mr-3"
          >
            User
          </Link>{" "}
          •{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Food Partner
          </Link>
        </nav>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              className="block text-base font-medium text-gray-700"
            >
              Business Name
            </label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Tasty Bites"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="contactName"
              className="block text-base font-medium text-gray-700"
            >
              Contact Name
            </label>
            <input
              id="contactName"
              name="contactName"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="block text-base font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="+91 1234567890"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="block text-base font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              *Full address helps customers find you faster.
            </p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-800 text-white text-lg font-semibold py-3 rounded-lg transition duration-300">
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-5">
          Already a partner?{" "}
          <Link
            to="/food-partner/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
