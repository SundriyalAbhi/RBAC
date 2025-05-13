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
        const checkuser = await CompanyMember.findOne({email:req.body.email})
        if(checkuser){
            res.status(409).send("User already exists")
            return;
        }
        const {password , ProfilePicture} = req.body
        let ProfilePictureUrl;
        if (ProfilePicture) {

            const uploadResponse = await cloudinary.uploader.upload(ProfilePicture);
            ProfilePictureUrl = uploadResponse.secure_url;

            ProfilePictureUrl = uploadResponse.secure_url;
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const MemberTobeadded = new CompanyMember({...req.body,ProfilePicture:ProfilePictureUrl,password:hashedPassword})
        const Member = await MemberTobeadded.save()
        res.send({Member,msg:"user created"})
    } catch (error) {
        console.log(error);
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
                res.send({token,userId:Member._id,ProfilePicture:Member.ProfilePicture,msg:"Welcome"})
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


