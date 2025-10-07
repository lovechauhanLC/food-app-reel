import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FoodPartnerResgister = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefalut()

    const businessName = e.target.businessName.value
    const contactName = e.target.contactName.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const password = e.target.password.value
    const address = e.target.address.value

    const response = await axios.post('http://localhost:3000/api/auth/foodpartner/register',{
      name: businessName,
      contactName,
      phone,
      address,
      email,
      password
    },{
      withCredentials:true
    }).then(response => {
        console.log(response.data);
        navigate("/create-food"); 
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });

    

  }

  return (
    <div>
        <div>
          <header>
            <h1>Partner sign up</h1>
            <p>Grow your business with our platform.</p>
          </header>
          <nav>
            <strong>Switch: </strong><Link to="/user/register">User</Link> • <Link to="/food-partner/register">Food partner</Link>
          </nav>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="businessName">Business Name</label>
              <input id='businessName' name='businessName' placeholder='Tasty Bites' />
            </div>
            <div>
              <label htmlFor="contactName">Contact Name</label>
              <input id='contactName' name='contactName' placeholder='John Doe'/>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id='phone' name='phone' placeholder='+91 1234567890' />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id='email' name='email' placeholder='you@example.com' />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id='password' name='password' placeholder='••••••••' />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id='address' name='address' placeholder='123 Market Street' />
              <p>Full address helps customers find you faster.</p>
            </div>
            <button>Sign Up</button>
          </form>
          <div>
            Already a partner? <Link to="/food-partner/login">Sign in</Link>
          </div>
        </div>
    </div>
  )
}

export default FoodPartnerResgister