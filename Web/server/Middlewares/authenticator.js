const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");
const CompanyMember = require("../Models/CompanyMemberModel");


exports.authenticator=async(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,process.env.SECRET)
        const user = await CompanyMember.findOne({email:verify.email})
        req.userId=user._id;

        next()
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token")
    }
}



const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = validate;
