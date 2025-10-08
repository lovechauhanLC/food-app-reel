import axios from "axios";
import React, { useState, useEffect } from "react";

const Saved = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
      });
    setvideos(savedFoods);
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
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <div items={videos} onSave={removeSaved} emptyMessage="No saved videos" />
  );
};

export default Saved;
