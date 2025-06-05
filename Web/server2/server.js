const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const path = require('path');
const AuthDataRouter = require("./Routes/AuthDataRoutes");
const dotenv = require("dotenv");
const { connectdb } = require("./Config/db");
const app = express()
dotenv.config({path:"./Config/config.env"})
app.use(cors())
app.use(morgan("dev"))
app.use(bodyparser.json({
    limit:"30mb"
}))
const allowedOrigins = [
  process.env.CORS_PORT || "http://localhost:3000",
  "http://localhost:3001"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectdb()
app.get("/",(req,res)=>{
  try {
      res.send("Hello")
  } catch (error) {
      console.log(error);
  }
})
app.use("/auth",AuthDataRouter)
app.listen(process.env.PORT,()=>{
    console.log("server is runing");
})