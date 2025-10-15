import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const {id} = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{
      withCredentials: true
    }).then((response) => {
      setProfile(response.data.foodPartner)
      setVideos(response.data.foodPartner.foodItems)
    })
  },[id])

  return (
    <main className='min-h-screen bg-gray-100 p-4 flex flex-col items-center '>
    <section className='w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mb-6'>
      <div className='relative w-full h-[25vh]  flex '>
        <img src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" className=' p-4 w-[40vw] h-[20vh] rounded-full ' />
        <div className='flex flex-col p-4 pl-8 gap-10  w-2/3'>
          <h1 className='text-gray-600 font-bold text-3xl'>{profile?.name || "test"}</h1>
          <h1 className='text-gray-600 font-bold text-3xl'>{profile?.address || "testadd"} </h1>
        </div>
      </div>

      <div className='reltive w-full h-[10vh] grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 '>
        <div className='p-2 flex flex-col gap-1 items-center'>
          <span className='text-gray-600 text-lg font-medium'>Total Meals</span>
          <span className='text-gray-800 text-xl font-bold'>{profile?.totalMeals || 0} </span>
        </div>
        <div className='p-2 flex flex-col gap-1 items-center'>
          <span className='text-gray-600 text-lg font-medium'>Customers Served</span>
          <span className='text-gray-800 text-xl font-bold'>{profile?.customerServered || 0} </span>
        </div>
      </div>
    </section>

    <section title='video' className=" w-full max-w-md h-full overflow-y-scroll snap-y snap-mandatory grid grid-cols-3 px-2 ">
      {videos.map((v) => (
        <div key={v._id} className="snap-start h-[20vh] w-[29.5vw] overflow-hidden ">
           <video className="w-full h-full object-cover" src={v.videos} muted></video>
        </div>
      ))}
    </section>
    </main>
  )
}

export default Profile