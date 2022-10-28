import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
   name: String,
   phoneNumber:Number,
   companyName:String,
   email:String,
   message:String

});

const contactFormModel = mongoose.model("contactForm", contactFormSchema);

export default contactFormModel;