import axios from "axios";
import React, { useState, useEffect } from "react";
import ReelFeed from "../../components/ReelFeed";

const Saved = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    const fetchSavedFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food/save", {
          withCredentials: true,
        });
        
        
        const savedFoods = response.data.savedFood.map((item) => ({
          _id: item.food._id,
          videos: item.food.videos,
          description: item.food.description,
          likeCount: item.food.likeCount,
          saveCount: item.food.saveCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setvideos(savedFoods);
      } catch (error) {
        console.error("Error fetching saved foods:", error);
      }
    };
    fetchSavedFoods();
  }, []);

  async function removeSaved(item) {
    try {
      axios.post(
        "http://localhost:3000/api/food/save",
        {
          foodId: item._id,
        },
        {
          withCredentials: true,
        }
      );
      setvideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, saveCount: Math.max(0, (v.saveCount ?? 1) - 1) }
            : v
        )
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <ReelFeed items={videos} onSave={removeSaved} emptyMessage="No saved videos" />
  );
};

export default Saved;
