import express from 'express'
import connectDB from './db/db.js'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'
import foodRoutes from './routes/food.routes.js'
import cartRoutes from './routes/cart.route.js'
import foodPartnerRoutes from './routes/foodPartner.route.js'
import cors from "cors";

connectDB()

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes);
app.use('/api/cart', cartRoutes)

export default app