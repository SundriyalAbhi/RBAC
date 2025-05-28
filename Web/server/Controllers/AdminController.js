const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../Models/CompanyModel');
const CompanyMember = require('../Models/CompanyMemberModel');
const AdminModel = require('../Models/AdminModel');
require('dotenv').config();


exports.registerAdmin = async (req, res) => {
  try {
    const { email, password, role ,companyId,name} = req.body;

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const CompanyName = await Company.findById(companyId)
    const newAdmin = new AdminModel({ email, password: hashedPassword, role , companyId, name, companyName:CompanyName.name});
    
    await newAdmin.save();
    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;  
    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, updates);

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating admin" });
  }
};
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      adminId: admin._id,
      role: admin.role,
      msg: 'Login successful',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};


exports.getAllAdmins = async (req, res) => {
  try {
    const {companyId} = req.body
    const admins = await AdminModel.find({companyId:companyId}).select('-password');
    res.status(200).send(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch admins' });
  }
};


exports.updateAdminRole = async (req, res) => {
  try {
    const { adminId, newRole } = req.body;
    const updated = await AdminModel.findByIdAndUpdate(
      adminId,
      { role: newRole },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    res.status(200).json({ msg: 'Role updated', updated });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update role' });
  }
};


exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deleted = await AdminModel.findByIdAndDelete(adminId);
    if (!deleted) return res.status(404).json({ msg: 'Admin not found' });

    res.status(200).json({ msg: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete admin' });
  }
};


exports.assignRole = async (req, res) => {
    const { userId, role } = req.body;
    try {
      const validRoles = ['admin', 'ciso', 'analyst', 'auditor'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ msg: 'Invalid role' });
      }
      const user = await CompanyMember.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.status(200).json({ msg: 'Role assigned', user });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  

  exports.getAllUsers = async (req, res) => {
    try {
      const {companyId} = req.body
      const users = await CompanyMember.find({companyId:companyId}, '-password'); 
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  
  
  exports.updateUser = async (req, res) => {
    try {
      const user = await CompanyMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ msg: 'User updated', user });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  

  exports.deleteUser = async (req, res) => {
    try {
      await CompanyMember.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'User deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };

  exports.GetAdminByName = async(req,res)=>{
      try {
          const {name} = req.query
          const GetAdmin = await AdminModel.find({
          name: { $regex: `^${name}`, $options: "i" }, 
          }).limit(10); 
          if(GetAdmin){
              res.send(GetAdmin)
          }else{
              res.send({msg:"Found Nothing"})
          }
      } catch (error) {
          console.log(error);
      }
  }