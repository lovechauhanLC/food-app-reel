import React from "react";
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
    <div>
      <div>
        <header>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your food journey.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div>New Here?  
            <Link to="/user/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
