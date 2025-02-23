const mongoose = require('mongoose');
const User = require('../models/user');
const doctorSchema = new mongoose.Schema({
    specialite: { type: String, required: true },
    tarif: { type: Number, required: true }
  });
  
  const Doctor = User.discriminator('doctor', doctorSchema);
  module.exports=Doctor