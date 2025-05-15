const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/AdminModel'); // Update path if different
require('dotenv').config();

// SIGNUP CONTROLLER
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword, role });

    await newAdmin.save();
    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

// SIGNIN CONTROLLER
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
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

// GET ALL ADMINS
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Hide passwords
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch admins' });
  }
};

// UPDATE ROLE OF AN ADMIN
exports.updateAdminRole = async (req, res) => {
  try {
    const { adminId, newRole } = req.body;

    // Prevent self-role change
    if (req.user.id === adminId) {
      return res.status(403).json({ msg: 'Admins cannot change their own role.' });
    }

    const updated = await Admin.findByIdAndUpdate(
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


// DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Prevent self-deletion
    if (req.user.id === adminId) {
      return res.status(403).json({ msg: 'Admins cannot delete their own account.' });
    }

    const deleted = await Admin.findByIdAndDelete(adminId);
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
  
      const user = await User.findByIdAndUpdate(
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
  
  // GET /users
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // exclude password
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  
  // PUT /user/:id
  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ msg: 'User updated', user });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  
  // DELETE /user/:id
  exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'User deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };