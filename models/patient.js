const mongoose = require('mongoose');
const User = require('../models/user');
const patientSchema = new mongoose.Schema({
    telephone: { type: String, required: true },
    adresse: { type: String, required: true }
  });
  
  const Patient = User.discriminator('patient', patientSchema);
  module.exports=Patient
  