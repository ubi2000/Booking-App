import express,{Request,Response} from "express"
import cors from "cors"
import mongoose, { mongo } from "mongoose"
import "dotenv/config"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
//DB connection
mongoose.connect(process.env.DB_URL as string)

const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.listen(3000,()=>{
 console.log("Server is running on 3000")
})