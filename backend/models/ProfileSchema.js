import mongoose from "mongoose";

const ProfileSchema  = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  city: String,
  pincode: Number,
})

export default mongoose.model('Profile', ProfileSchema);