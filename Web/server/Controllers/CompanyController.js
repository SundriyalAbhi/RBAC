const AdminModel = require("../Models/AdminModel");
const CompanyMember = require("../Models/CompanyMemberModel");
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
        res.status(200).send({CompanySaved,msg:"Company Added"})

    } catch (error) {
        console.log(error);
    }
}



exports.UpdateCompanyDetails = async(req,res)=>{
    try {
        const { name , industry , city , state , country} = req.body
        const {id} = req.params
        const findCompany = await Company.findOneAndUpdate({_id:id}, {name:name , industry:industry , address:{city:city,state:state,country:country}})
        const SavedDetails = await findCompany.save()
        res.send(SavedDetails)
    } catch (error) {
        console.log(error);
    }
}


exports.DeleteCompany = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const findCompany = await Company.findOne({ email });

    if (!findCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const DeleteAdmin = await AdminModel.deleteMany({ companyId: findCompany._id });

    const deletedCompany = await Company.findByIdAndDelete(findCompany._id);

    return res.status(200).json({
      message: 'Company and associated admins deleted successfully',
      deletedCompany,
    });
  } catch (error) {
    console.error('DeleteCompany Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

