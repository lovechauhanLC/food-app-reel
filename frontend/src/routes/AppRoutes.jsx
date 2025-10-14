import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerResgister from '../pages/auth/FoodPartnerResgister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Home from '../pages/general/Home'
import Saved from '../pages/general/Saved'
import BottomNav from '../components/BottomNav'


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
                <Route path='/' element={<><Home/><BottomNav/></>} />
                <Route path='/saved' element={<><Saved/><BottomNav/> </>} />
                <Route path='/create-food' element={<CreateFood/>} />
                <Route path='/food-partner:id' element={<Profile/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default AppRoutes