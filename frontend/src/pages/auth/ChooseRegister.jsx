import React from "react";
import { Link } from "react-router-dom";

const ChooseRegister = () => {
  return (
    <div>
      <div>
        <header>
          <h1>Register</h1>
          <p>Pick how you want to join the platform.</p>
        </header>
        <div>
          <Link to="/user/register">Register as normal user</Link>
          <Link to="/food-partner/register">Register as food partner</Link>
        </div>
        <div>
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
