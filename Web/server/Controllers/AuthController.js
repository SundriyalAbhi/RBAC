const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.signup = async(req,res)=>{
    try {
        const checkuser = await User.findOne({email:req.body.email})
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
        const userTobeadded = new User({...req.body,ProfilePicture:ProfilePictureUrl,password:hashedPassword})
        const user = await userTobeadded.save()
        res.send({user,msg:"user created"})
    } catch (error) {
        console.log(error);
    }
}

exports.signin = async(req,res)=>{
    try {
        const { email, password } = req.body
        const user = await User.findOne({email:email})
        if(user){
            const verify = await bcrypt.compare(password,user.password)
            if(verify){
                const token = jwt.sign({email,password},process.env.SECRET)
                res.send({token,userId:user._id,ProfilePicture:user.ProfilePicture,msg:"Welcome"})
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

exports.findAccount = async(req,res)=>{
    try {
        console.log(req.params.email);
        
        const account = await User.findOne({email:req.params.email})
        // console.log(account);
        
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