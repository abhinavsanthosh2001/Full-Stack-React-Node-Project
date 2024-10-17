import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import auth from  "./routes/authRoute.js"
import hotels from  "./routes/hotelsRoute.js"
import users from  "./routes/usersRoute.js"
import rooms from  "./routes/roomsRoute.js"

const app = express()

dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mondodb")
      } catch(error){
          throw error
      }
};
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})

// middlewares
app.use(express.json());  // To send json request objects

app.use("/api/auth", auth)
app.use("/api/users", users)
app.use("/api/hotels", hotels)
app.use("/api/rooms", rooms)

app.use((err, req, res, next)=>{
    const errorStatus  = err.status ? err.status : 500;
    const errorMessage = err.message ? err.message : "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        stack: err.stack.length < 200 ? err.stack : err.stack.substring(0,200) + "..."
    })
})




app.listen(8800,()=>{
    connect()
    console.log("Backend server Started!")
})