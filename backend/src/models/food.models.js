import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    videos:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner'
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel