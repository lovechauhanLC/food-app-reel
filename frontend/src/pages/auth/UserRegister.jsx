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
    <div className="min-h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% px-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 ">Create Your Account</h1>
          <p className="text-gray-500 text-sm mt-1 ">Join to explore and enjoy delicious meals.</p>
        </header>
        <nav className=" mb-6 text-xl text-gray-600 ">
          <strong className="font-medium text-gray-700 mr-3">Switch: </strong>{" "}•{" "}
          <Link to="/user/register" className="text-blue-600 font-medium text-xl hover:underline mr-3">User</Link>
          {" "}•{" "}
          <Link to="/food-partner/register" className="text-blue-600 font-medium text-xlhover:underline" >Food Partner</Link>
        </nav>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName"
                className="block text-[16px] font-medium text-gray-700 mb-1"
              >First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                type="text"
                className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="block text-[16px] font-medium text-gray-700 mb-1">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doh"
                type="text"
                className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="block text-[16px] font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
            />
          </div>

          <button type="submit"
            className="w-full bg-blue-500 hover:bg-blue-800 text-xl text-white font-medium py-2 rounded-lg transition"
          >Sign Up</button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/user/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
