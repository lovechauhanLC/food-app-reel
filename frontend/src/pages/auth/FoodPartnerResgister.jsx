import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerResgister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefalut();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios
      .post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          name: businessName,
          contactName,
          phone,
          address,
          email,
          password,
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
    <div className="min-h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% px-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-3">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 ">
            Partner sign up
          </h1>
          <p className="text-gray-500 text-sm mt-1 ">
            Grow your business with our platform.
          </p>
        </header>
        <nav className=" mb-6 text-xl text-gray-600 ">
          <strong className="font-medium text-gray-700 mr-3">Switch: </strong> •{" "}
          <Link
            to="/user/register"
            className="text-blue-600 font-medium text-xl hover:underline mr-3"
          >
            User
          </Link>{" "}
          •{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-600 font-medium text-xlhover:underline"
          >
            Food Partner
          </Link>
        </nav>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="businessName" className="block text-[16px] font-medium text-gray-700">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="contactName" className="block text-[16px] font-medium text-gray-700">Contact Name</label>
            <input id="contactName" name="contactName" placeholder="John Doe" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="block text-[16px] font-medium text-gray-700 ">Phone</label>
            <input id="phone" name="phone" placeholder="+91 1234567890" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 ">Email</label>
            <input id="email" name="email" placeholder="you@example.com" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="block text-[16px] font-medium text-gray-700 ">Password</label>
            <input id="password" name="password" placeholder="••••••••" className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="block text-[16px] font-medium text-gray-700 ">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              className="w-full border text-[16px]border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
            />
            <p className="text-sm">*Full address helps customers find you faster.</p>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-800 text-xl text-white font-medium py-2 rounded-lg transition">Sign Up</button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-4">
          Already a partner? <Link to="/food-partner/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerResgister;
