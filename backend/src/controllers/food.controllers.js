import foodModel from '../models/food.models.js'
import likesModel from '../models/likes.model.js'
import saveModel from '../models/save.model.js'
import storageService from '../services/storage.services.js'
import { v4 as uuid } from 'uuid';

async function createFood(req, res) {

  try {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      videos: fileUploadResult.url,
      foodPartner: req.foodPartner._id
    })

    return res.status(201).json({
      message: "Food item upload",
      food: foodItem
    });
  } catch (err) {
    console.error("Error in createFood:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFoodItems(req, res) {

  const foodItems = await foodModel.find({})
  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems
  })
}

async function likeFood(req, res) {
  const { foodId } = req.body
  const user = req.user

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    food: foodId
  })

  if (isAlreadyLiked) {
    await likesModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 }
    })

    return res.status(201).json({
      message: "Food unliked succesfully"
    })
  }

  const like = await likesModel.create({
    user: user._id,
    food: foodId
  })

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 }
  })

  return res.status(201).json({
    message: "Food liked succesfully",
    like
  })
}

async function saveFood(req, res) {
  const { foodId } = req.body
  const user = req.user

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: -1 }
    })

    return res.status(201).json({
      message: "Food unsaved succesfully"
    })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: 1 }
  })

  return res.status(201).json({
    message: "Food saved succesfully",
    save
  })
}

async function getSaveFood(req, res) {
  const user = req.user
  const savedFood = await saveModel.find({ user: user._id }).populate('food')

  if (!savedFood || savedFood.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFood
  });
}
export default { createFood, getFoodItems, likeFood, saveFood, getSaveFood }