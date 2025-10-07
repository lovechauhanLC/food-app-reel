import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
    }
},{
    timestamps:true
})

const likesModel = mongoose.model('likes',likesSchema)

export default likesModel