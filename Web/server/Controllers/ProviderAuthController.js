const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const Provider = require("../Models/ProviderModel");
const cloudinary = require('cloudinary').v2;
dotenv.config({path:"./Config/config.env"})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.Providersignup = async(req,res)=>{
    try {
        const checkuser = await Provider.findOne({email:req.body.email})
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
        const providerTobeadded = new Provider({...req.body,ProfilePicture:ProfilePictureUrl,password:hashedPassword})
        const provider = await userTobeadded.save()
        res.send({providerTobeadded,msg:"user created"})
    } catch (error) {
        console.log(error);
    }
}

exports.Providersignin = async(req,res)=>{
    try {
        const { email, password } = req.body
        const provider = await Provider.findOne({email:email})
        if(provider){
            const verify = await bcrypt.compare(password,provider.password)
            if(verify){
                const token = jwt.sign({email,password},process.env.SECRET)
                res.send({token,userId:provider._id,ProfilePicture:provider.ProfilePicture,msg:"Welcome"})
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

exports.ProviderfindAccount = async(req,res)=>{
    try {
        const account = await Provider.findOne({email:req.params.email})
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