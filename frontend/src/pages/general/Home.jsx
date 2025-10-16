import axios from "axios";
import React, { useState, useEffect } from "react";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [onAddToCart, setonAddToCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setVideos(response.data.foodItems);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

    useEffect(() => {
    const fetchLikedAndSaved = async () => {
      try {
        const [likedRes, savedRes, cartRes] = await Promise.all([
          axios.get("http://localhost:3000/api/food/like", { withCredentials: true }),
          axios.get("http://localhost:3000/api/food/save", { withCredentials: true }),
          axios.get("http://localhost:3000/api/cart", { withCredentials: true }),
        ]);

        setLikedVideos(likedRes.data.likedVideos || []);
        setonAddToCart(cartRes.data.items);

        const savedIds = savedRes.data.savedFood?.map(item => item.food._id) || [];
        setSavedVideos(savedIds);
      } catch (error) {
        console.error("Error fetching liked/saved videos:", error);
      }
    };

    fetchLikedAndSaved();
  }, []);



  async function likeVideos(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      {
        foodId: item._id,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.like) {
      console.log("Video liked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
        )
      );
      setLikedVideos((prev) => [...prev, item._id]);
    } else {
      console.log("Video unliked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
        )
      );
      setLikedVideos((prev) => prev.filter((id) => id !== item._id));
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      {
        foodId: item._id,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.save) {
      console.log("video saved");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v
        )
      );
      setSavedVideos((prev) => [...prev, item._id]);
    } else {
      console.log("video unsaved");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v
        )
      );
      setSavedVideos((prev) => prev.filter((id) => id !== item._id));
    }
  }

  async function addToCart(item) {
    const response = await axios.post(
      "http://localhost:3000/api/cart",
      {
        items: [
          {
            food: item._id,
            quantity:1
          }
        ]
      },
      {
        withCredentials: true,
      }
    );
    console.log("response", response)

    if (response.data.save) {
      console.log("food added to cart");
      setonAddToCart((prev) => [...prev, item._id]);
    } else {
      setonAddToCart((prev) => prev.filter((id) => id !== item._id));
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideos}
      onSave={saveVideo}
      onAddToCart={onAddToCart}
      likedVideos={likedVideos}
      savedVideos={savedVideos}
      emptyMessage="No Videos Available"
    />
  );
};

export default Home;
