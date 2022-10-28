
import usersModel from "../models/users.js";
import postFormModel from "../models/postFormModel.js";
import mongoose from "mongoose";


export const postPost = async (req, res) => {


    const {image, address, city, postType, numberOfPersons,lastActive,contactPerson,contactNumber,contactEmail, startDate, endDate } = req.body;
    try {
        const user = await usersModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        console.log(req.body);
     
        const post = new postFormModel({
            
            address,
            city,
            postType,
            numberOfPersons,  
            lastActive ,
            contactPerson,
            contactNumber,
            contactEmail,
            startDate,
            endDate,
            image,
            // creator: req.user.id

        });
console.log("post:", post);
        await post.save();
        user.post.push(post._id);
        await user.save();
        res.status(200).json({ msg: "post Added!" });
    } catch (error) {
        res.status(500).send("Error");
    }

};


export const getUserPost = async (req, res)=>{

    try {
        const accs = []
        const user = await usersModel.findById(req.user.id);

        user.post.forEach(place=> {
            accs.push(place.toHexString()) 

        })

        const records = await postFormModel.find({'_id': {$in: accs}})
       
        res.json(records)
    } catch (error) {
        res.send(error)
    }
}


export const deleteUserPost = async (req, res) => {
    const { id } = req.params;
    try {
        await postFormModel.findByIdAndDelete(id);
        const user = await usersModel.findById(req.user.id);
        console.log("User:", user);
        const updatedpost = user.post.filter(item => item != id);
        user.post = updatedpost;
        await user.save();
        res.status(200).json({ msg: "post Deleted!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { address, city, postType, numberOfPersons,  } = req.body;
    try {
        await postFormModel.findByIdAndUpdate(id, {
            address,
            city,
            postType,
            numberOfPersons,
            // availabilityFrom,
            // availabilityTo,
        });
        res.status(200).json({ msg: "post Updated!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllPost = async (req, res) => {
    //code here
    try {
      const post = await postFormModel.find();
      res.status(200).json({ data: post });
    } catch (error) {
      console.log(error.message);
    }
  };

