const User = require('../models/user');
const Doctor = require('../models/docter');
const Patient = require('../models/patient');


exports.addUser = async (req, res) => {
    try {
        const userData = req.body;

        if (userData.role === 'doctor') {
            if (!userData.specialite) {
                return res.status(400).json({ message: 'specialite is required for doctors' });
            }
            if (!userData.tarif) {
                return res.status(400).json({ message: 'tarif is required for doctors' });
            }
        } else if (userData.role === 'patient') {
            delete userData.specialite;
            delete userData.tarif;
        } else if (userData.role === 'admin') {
            delete userData.specialite;
            delete userData.tarif;
            delete userData.telephone;
            delete userData.adresse;
        }

        const user = new User(userData);
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

  exports.put = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { $set: newData }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};
