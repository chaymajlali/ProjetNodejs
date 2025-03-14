const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
  telephone: { type: String },
  specialite: { type: String },
  tarif: { type: Number },     
  adresse: { type: String }   
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
