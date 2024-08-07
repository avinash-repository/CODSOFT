const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  motivation: { type: String, required: true },
  resume: { type: String, required: true }, 
  class10Percentage: { type: Number, required: true },
  class10Board: { type: String, required: true },
  class12Percentage: { type: Number, required: true },
  class12Board: { type: String, required: true },
  role: { type: String, required: true },
  currentEducation: { type: String, required: true },
  collegeName: { type: String, required: true },
}, { timestamps: true });

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
