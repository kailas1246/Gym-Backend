import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  membershipType: String,
  membershipDate: Date,
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
