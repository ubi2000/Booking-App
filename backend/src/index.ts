import express,{Request,Response} from "express"
import cors from "cors"
import mongoose, { mongo } from "mongoose"
import "dotenv/config"


//DB connection
mongoose.connect(process.env.DB_URL as string)


const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())




app.get("/api",async(req:Request,res:Response)=>{
res.json({message:"Hello from api"})
})

app.listen(3000,()=>{
 console.log("Server is running on 3000")
})