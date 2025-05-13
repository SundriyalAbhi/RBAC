const Company = require("../Models/CompanyModel");


exports.AddCompany = async(req,res)=>{
    try {
        const {email , createdBy, city, state, country} = req.body
        checkEmail = await Company.findOne({email:email})
        if(checkEmail){
            res.status(400).send("Company already exists")
            return;
        }
        const CompanytobeAdded = new Company({...req.body,createdBy:createdBy})
        CompanytobeAdded.address.city = city
        CompanytobeAdded.address.state = state
        CompanytobeAdded.address.country = country
        const CompanySaved = await CompanytobeAdded.save()
        res.send({CompanySaved,msg:"Company Added"})

    } catch (error) {
        console.log(error);
    }
}

exports.GetAllCompany = async(req,res)=>{
    try {
        const AllCompanyS = await Company.find()
        res.send({AllCompanyS,msg:"ALl CompanyS"})
    } catch (error) {
        console.log(error);
    }
}

exports.GetCompanyByName = async(req,res)=>{
    try {
        const {name} = req.body
        const GetCompany = await Company.findOne({name:name})
        if(GetCompany){
            res.send(GetCompany)
        }else{
            res.send({msg:"Found Nothing"})
        }
    } catch (error) {
        console.log(error);
    }
}

exports.UpdateCompanyDetails = async(req,res)=>{
    try {
        const {email , name , industry , city , state , country} = req.body
        const findCompany = await Company.findOneAndUpdate({email,email }, {name:name , industry:industry , address:{city:city,state:state,country:country}})
        const SavedDetails = await findCompany.save()
        res.send(SavedDetails)
    } catch (error) {
        console.log(error);
    }
}