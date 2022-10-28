
import jtw from "jsonwebtoken";
import userModel from "../models/users.js";
import contactFormModel from "../models/contactFormModel.js";


export const saveContactForm = async (req, res) => {
 //const {name, email, phone_number, company_name} = req.body; 
const newContactForm=await contactFormModel.create(req.body);
 res.json(newContactForm)
} 

export const getUser = async (req, res) => {
  //code here
  try {
    console.log(req);
    const user = await signupModel.findById(req.body.user_id).populate("accomodation", "help" , "jobs", "status" );
    res.status(200).json({user});
    // const history = await HistoryModel.find();
    // res.status(200).json(history);
} catch (error) {
    res.status(500).send(error);
}

}

export const createUser = async (req, res) => {
  //code here
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};



export const postUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateUser = async (req, res) => {
  //code here
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};


    
    export const loggedIn = async (req, res) => {
     
        try {
          const user = await signupModel.findById(req.user.id).select("-password");
          res.status(200).json(user);
          console.log(signupModel)
        } 
       
        catch (error) {
          res.json(error.message);
        }
      
      };
