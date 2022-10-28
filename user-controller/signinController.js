//import userLogin from "../models/userLoginModel.js";
import jwt from "jsonwebtoken";
import userModel from "../models/users.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
    const {  email, password } = req.body;
    
   

    try {
        let user = await userModel.findOne({ email });
       
        
        if (!user) {
          return res.status(400).json({ msg: "User Not Exists!" });
        }
       
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({ msg: "Incorrect Password!" });
        }
       
        const payload = {
          user: {
            id: user.id,
            name: user.name,
          },
        };
    
        jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
          if (err) throw err;
          res.status(200).json({result: user,  token });
        });
        // console.log("User:", user.userName);
      } catch (error) {}
    };