import express from 'express'
import connectDB from './db/db.js'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'

connectDB()

const app = express()
app.use(cookieParser())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/api/auth',authRoutes)

export default app