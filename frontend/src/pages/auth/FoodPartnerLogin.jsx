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
    <div>
      <div>
        <header>
          <h1>Partner login</h1>
          <p>Access your dashboard and manage orders.</p>
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input id='email' type="email" placeholder="business@example.com"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id='password' placeholder="Password" type="password" />
          </div>
          <button>Sign In</button>
        </form>
        <div>
          New partner? <Link to='/food-partner/register'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin