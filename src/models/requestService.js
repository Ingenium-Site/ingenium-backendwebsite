import mongoose from "mongoose";

const requestServiceSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
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
  serviceType: {
    type: String,
    required: [true, "Service Type is required"],
    trim: true,
    maxlength: 100
  },
  ipAddress: {
    type: String,
    required: [true, "IP Address is required"]
  }
},

{ timestamps: true });

const RequestService = mongoose.model("RequestService", requestServiceSchema);

export default RequestService;
