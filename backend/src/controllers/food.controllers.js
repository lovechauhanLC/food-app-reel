import foodModel from '../models/food.models.js'
import likesModel from '../models/likes.model.js'
import saveModel from '../models/save.model.js'
import storageService from '../services/storage.services.js'
import { v4 as uuid } from 'uuid';

async function createFood(req, res) {
   // console.log(">>> Inside createFood controller");

  try {
   //  console.log("req.foodPartner:", req.foodPartner);
   //  console.log("req.body:", req.body);
   //  console.log("req.file:", req.file);

    if (!req.file) {
      // console.log("No file uploaded");
      return res.status(400).json({ message: "File is required" });
    }

   //  console.log("Uploading file...");
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
   //  console.log("Upload complete:", fileUploadResult);

   const foodItem = await foodModel.create({
      name:req.body.name,
      description:req.body.description,
      videos: fileUploadResult.url,
      foodPartner: req.foodPartner._id
   })

   // console.log("foodItem created");
   

    return res.status(201).json({
      message: "Food item upload",
      food: foodItem
    });
  } catch (err) {
    console.error("Error in createFood:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFoodItems(req,res) {
  //  console.log('creating food item');
   
   const foodItems = await foodModel.find({})
  //  console.log('created food item');
   res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res) {
  const {foodId} = req.body
  const user = req.user

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    food: foodId
  })

  if(isAlreadyLiked){
    await likesModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await likesModel.findByIdAndUpdate(foodId,{
      $inc: {likeCount: -1}
    })

    return res.status(201).json({
      message:"Food unliked succesfully"
    })
  }

  const like = await likesModel.create({
    user: user._id,
    food: foodId
  })

  await likesModel.findByIdAndUpdate(foodId,{
    $inc: {likeCount: 1}
  })

  return res.status(201).json({
      message:"Food liked succesfully",
      like
    })
}

async function saveFood(req,res) {
  const {foodId} = req.body
  const user = req.user

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if(isAlreadySaved){
    await saveModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await saveModel.findByIdAndUpdate(foodId,{
      $inc: {saveCount: -1}
    })

    return res.status(201).json({
      message:"Food unsaved succesfully"
    })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })

  await saveModel.findByIdAndUpdate(foodId,{
    $inc: {saveCount: 1}
  })

  return res.status(201).json({
      message:"Food saved succesfully",
      save
    })
}

async function getSaveFood(req,res) {
  const user = req.user
  const savedFood = await saveModel.findOne({user: user._id}).populate('food')

  if(!saveFood || saveFood.length === 0){
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}
export default { createFood,getFoodItems, likeFood, saveFood, getSaveFood}