const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const OTPModel = require("../Models/OTPModel");

dotenv.config({path:"./Config/config.env"})



exports.sendOTP =async(req,res)=> {
  console.log(req.body);
    try {
        const { UserEmail } = req.body;
 const otp = Math.floor(100000 + Math.random() * 900000)
 const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  });


  const mailOptions = {
    from: 'tobi909144@gmail.com', 
    to: `${UserEmail}`,
    subject: "Reset Password OTP", 
    text: `Enter ${otp} in the app to reset your password. OTP expires in 5 mins.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({ Status: "Error sending email" });
    } else {
       res.json({ Status: "OTP Sent Successfully", email:UserEmail });
    }
  });

    const otpInstance = new OTPModel({
      email:UserEmail,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)  // OTP valid for 5 minutes
    });

    await otpInstance.save();  // Save OTP to DB

    } catch (error) {
        console.error("Error sending OTP:", error);
    res.status(500).json({ Status: "Error", message: error.message });
    }
}


exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const otpRecord = await OTPModel.findOne({ email });

    if (!otpRecord) {
      return res.send({ msg: "No OTP found for this email" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.send({ msg: "OTP has expired" });
    }

    if (otpRecord.otp !== otp) {
      return res.send({ msg: "Invalid OTP" });
    }

  
    await OTPModel.deleteOne({ email });

    res.status(200).send({ msg: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ msg: error.message });
  }
};
