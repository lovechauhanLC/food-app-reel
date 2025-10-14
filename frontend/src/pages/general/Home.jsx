import axios from 'axios'
import React, { useState,useEffect } from 'react'
import ReelFeed from '../../components/ReelFeed'


const Home = () => {

    const [videos, setVideos] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/api/food",{
            withCredentials:true
        }).then((response) => {
                console.log(response)
                setVideos(response.data.foodItems)
        }).catch((err) => {
            throw err
        });
    },[])

    async function likeVideos(item) {
        const response = await axios.post("http://localhost:3000/api/food/like",{
            foodId:item._id
        },{
            withCredentials: true
        })
            
        if(response.data.like){
            console.log("Video liked")
            setVideos((prev)=> prev.map((v)=> v._id===item._id ? {...v, likeCount: v.likeCount+1}: v))
            
        }else{
            console.log("Video unliked");
            setVideos((prev)=> prev.map((v)=> v._id===item._id ? {...v, likeCount: v.likeCount-1}: v))
        }
    }

    async function saveVideo(item) {
        const response = await axios.post("http://localhost:3000/api/food/save",{
            foodId: item._id
        },{
            withCredentials: true
        })

        if(response.data.save){
            console.log("video saved");
            setVideos((prev) => prev.map((v)=> v._id===item._id ? {...v, saveCount: v.saveCount+1} : v))
        }else{
            console.log("video unsaved");
            setVideos((prev) => prev.map((v)=> v._id===item._id ? {...v, saveCount: v.saveCount-1} : v))
        }
    }

  return (
    <ReelFeed
        items={videos}
        onLike={likeVideos}
        onSave={saveVideo}
        emptyMessage = "No Videos Available"
    />
  )
}

export default Home