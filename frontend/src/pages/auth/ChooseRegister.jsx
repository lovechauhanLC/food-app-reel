import React from "react";
import { Link } from "react-router-dom";

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-10">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Register
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Choose how you want to join
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            to="/user/register"
            className="w-full py-3 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-blue-600 active:scale-95 transition"
          >
            Register as User
          </Link>

          <Link
            to="/food-partner/register"
            className="w-full py-3 bg-green-500 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-green-600 active:scale-95 transition"
          >
            Register as Food Partner
          </Link>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChooseRegister;