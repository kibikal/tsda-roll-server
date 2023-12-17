const mongoose = require("mongoose");

const registrantTemplate = mongoose.Schema({
  fullName: { type: String },
  staffID: { type: String },
  job: { type: String },
  dateOfBirth: { type: String },
  ssnit: { type: String },
  ghCard: { type: String },
  unit: { type: String },
  department:{type:String},
  tel:{type:String},
  region:{type:String},
  leaveStart:{type:String},
  leaveEnd:{type:String},
  comment:{type:String},
  bank: { type: String },
  accountNumber: { type: String },
  payrollStatus: { type: Boolean },
  post: { type: String },
  leaveType: { type: String }
});
module.exports = mongoose.model("registeredStaff", registrantTemplate);