import foodModel from '../models/food.models.js'
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

   console.log("foodItem created");
   

    return res.status(201).json({
      message: "Food item upload",
      food: foodItem
    });
  } catch (err) {
    console.error("Error in createFood:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



export default { createFood }