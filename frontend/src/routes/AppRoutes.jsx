import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerResgister from '../pages/auth/FoodPartnerResgister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'

const AppRoutes = () => {
  return (
    <div>
        <Router>
            <Routes>

                <Route path='/register' element={<ChooseRegister/>} />
                <Route path='/user/register' element={<UserRegister/>} />
                <Route path='/user/login' element={<UserLogin/>} />
                <Route path='/food-partner/register' element={<FoodPartnerResgister/>} />
                <Route path='/food-partner/login' element={<FoodPartnerLogin/>} />
                <Route path='/' element={<h1>food-partner login</h1>} />
                <Route path='/saved' element={<h1>food-partner login</h1>} />
                <Route path='/created-food' element={<h1>food-partner login</h1>} />
                <Route path='/food-partner:id' element={<h1>food-partner login</h1>} />
            </Routes>
        </Router>
    </div>
  )
}

export default AppRoutes