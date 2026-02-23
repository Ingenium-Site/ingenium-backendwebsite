import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: 10,
    maxlength: 1000
  },
    ipAddress: {
      type: String,
      required: [true, "IP Address is required"]
    }
}, 

{ timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;