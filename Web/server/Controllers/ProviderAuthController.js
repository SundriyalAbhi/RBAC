const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Provider = require("../Models/ProviderModel");
const AdminModel = require("../Models/AdminModel");
const cloudinary = require('cloudinary').v2;

dotenv.config({ path: "./Config/config.env" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


exports.Providersignup = async (req, res) => {
    try {
        const checkuser = await Provider.findOne({ email: req.body.email });
        if (checkuser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const { password, ProfilePicture } = req.body;
        let ProfilePictureUrl;

        if (ProfilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(ProfilePicture);
            ProfilePictureUrl = uploadResponse.secure_url;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const providerTobeadded = new Provider({
            ...req.body,
            ProfilePicture: ProfilePictureUrl,
            password: hashedPassword
        });

        const provider = await providerTobeadded.save();
        res.status(201).json({ provider, message: "User created" }); 

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};

exports.Providersignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const provider = await Provider.findOne({ email });

        if (!provider) {
            return res.status(404).json({ message: "User does not exist" }); 
        }

        const verify = await bcrypt.compare(password, provider.password);
        if (!verify) {
            return res.status(401).json({ message: "Wrong password" }); 
        }

        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).json({
            token,
            userId: provider._id,
            ProfilePicture: provider.ProfilePicture,
            message: "Welcome"
        }); 

    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.ProviderfindAccount = async (req, res) => {
    try {
        const account = await Provider.findOne({ email: req.params.email });

        if (!account) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ email: account.email });
    } catch (error) {
        console.error("Find Account Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getAllAdminsforProvider  = async (req, res) => {
  try {
    const admins = await AdminModel.find().select('-password');
    res.status(200).send(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch admins' });
  }
};

