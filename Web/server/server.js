const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require('helmet');
const dotenv = require("dotenv")
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const fs = require('fs');
const path = require('path');
const { connectdb } = require("./Config/db")
const OTPRouter = require("./routes/OTPRoute")
const validateEmailRouter = require("./routes/ValidateEmailRouter")
const ComapnyRouter = require("./routes/CompanyRouter");
const AdminRouter = require("./routes/AdminRouter");
const ProviderRouter = require("./routes/ProviderRoute");
const MemberRouter = require("./routes/MemberRouter");
const { app } = require("./Socket.IO/SocketIO");
const ActivityRouter = require("./routes/ActivityRoute");
const SessionDataRouter = require("./routes/SessionDataRouter");
dotenv.config({path:"./Config/config.env"})
app.use(helmet()); 

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};


app.use(bodyparser.json({
    limit:"30mb"
}))
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
  app.use(morgan('combined', { stream: accessLogStream }));
}


connectdb()

app.get("/",(req,res)=>{
  try {
      res.send("Hello")
  } catch (error) {
      console.log(error);
  }
})
app.use("/Member",MemberRouter)
app.use("/otp",OTPRouter)
app.use("/checkEmail",validateEmailRouter)
app.use("/Provider",ProviderRouter)
app.use("/company",ComapnyRouter)
app.use('/admin', AdminRouter);
app.use('/activity',ActivityRouter)
app.use('/session',SessionDataRouter)
