const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const CompanyMember = require("../Models/CompanyMemberModel");
const cloudinary = require('cloudinary').v2;
dotenv.config({path:"./Config/config.env"})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.Usersignup = async(req,res)=>{
    try {
        const {companyId} = req.body
        const checkuser = await CompanyMember.findOne({email:req.body.email})
        if(checkuser){
            return res.status(409).json({ message: "User already exists" });
        }
        const {password , ProfilePicture} = req.body
        let ProfilePictureUrl;
        if (ProfilePicture) {

            const uploadResponse = await cloudinary.uploader.upload(ProfilePicture);
            ProfilePictureUrl = uploadResponse.secure_url;
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const MemberTobeadded = new CompanyMember({...req.body,ProfilePicture:ProfilePictureUrl,password:hashedPassword,companyId:companyId})
        const Member = await MemberTobeadded.save()
        res.status(201).json({Member,msg:"user created"})
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

exports.Usersignin = async(req,res)=>{
    try {
        const { email, password } = req.body
        const Member = await CompanyMember.findOne({email:email})
        if(Member){
            const verify = await bcrypt.compare(password,Member.password)
            if(verify){
                const token = jwt.sign({email,password},process.env.SECRET)
                res.send({token,userId:Member._id,ProfilePicture:Member.ProfilePicture,role:Member.role,msg:"Welcome"})
            }else{
                res.status(401).send("Wrong Password")
            }
        }else{
            res.status(404).send("user does not Exists")
        }
    } catch (error) {
        console.log(error);
    }
}

exports.UpdateUserDetails = async (req, res) => {
  try {
    const { _id, email, firstName, lastName, role } = req.body;
    if (!_id || !email || !firstName || !lastName || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedUser = await CompanyMember.findByIdAndUpdate(
      _id,
      {
        email,
        firstName,
        lastName,
        role
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error." });
  }
};


exports.UserfindAccount = async(req,res)=>{
    try {
        const account = await CompanyMember.findOne({email:req.params.email})
        if(account){
            res.send({email:account.email})
        }
        else{
            res.send("User Not Found")
        }
    } catch (error) {
      console.log(error); 
    }
}


