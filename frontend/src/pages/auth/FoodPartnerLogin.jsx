import React from 'react'
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

const FoodPartnerLogin = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = axios.post("http://localhost:3000/api/auth/foodpartner/login",{
      email,
      password
    },{
      withCredentials: true
    }).then(response => {
        console.log(response.data);
        navigate("/create-food"); 
      })
      .catch(error => {
        console.error("There was an error in logging!", error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% px-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 ">Partner login</h1>
          <p lassName="text-gray-500 text-sm mt-1 ">Access your dashboard and manage orders.</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 mb-1">Email</label>
            <input id='email' type="email" placeholder="business@example.com" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="block text-[16px] font-medium text-gray-700 mb-1">Password</label>
            <input id='password' placeholder="Password" type="password" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-800 text-xl text-white font-medium py-2 rounded-lg transition">Sign In</button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-4">
          New partner? <Link to='/food-partner/register' className="text-blue-600 font-medium hover:underline">Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin