const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const { connectdb } = require("./Config/db")
const AuthRouter = require("./routes/AuthRouter")
const OTPRouter = require("./routes/OTPRoute")
// const { app, server } = require("./SOCKETIO/socketio")
dotenv.config({path:"./Config/config.env"})
const app = express()
app.use(
  cors({
    origin:process.env.CORS_PORT||"http://localhost:3000", 
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(bodyparser.json({
    limit:"30mb"
}))
app.use(morgan("dev"))
connectdb()

app.get("/",(req,res)=>{
  try {
      res.send("Hello")
  } catch (error) {
      console.log(error);
  }
})
app.use("/auth",AuthRouter)
app.use("/otp",OTPRouter)

app.listen(process.env.PORT,()=>{
    console.log("server is running");
})
