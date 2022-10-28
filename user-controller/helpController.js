
import usersModel from "../models/users.js";
import helpFormModel from "../models/helpFormModel.js";

import mongoose from "mongoose";

export const postHelp = async (req, res) => {


    const { contactEmailHelp, addressHelp, contactPersonHelp, TypeOfLanguageHelp,orgHelp,startDateHelp,endDateHelp, helpType, contactNumberHelp, cityHelp } = req.body;
    
    try {
        const user = await usersModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
     console.log(req.body);
        const help = new helpFormModel({
            
            contactEmailHelp,
            addressHelp,
            contactPersonHelp,
            cityHelp,
            helpType,
            TypeOfLanguageHelp,  
            orgHelp,
            startDateHelp,
            endDateHelp,
            contactNumberHelp,
            
            // creator: req.user.id

        });
console.log("Help:", help);
        await help.save();
        user.help.push(help._id);
        await user.save();
        res.status(200).json({ msg: "help Added!" });
    } catch (error) {
        res.status(500).send("Error");
    }

};


export const getUserHelp = async (req, res)=>{

    try {
        const accs = []
        const user = await usersModel.findById(req.user.id);

        user.help.forEach(place=> {
            accs.push(place.toHexString()) 

        })

        const records = await helpFormModel.find({'_id': {$in: accs}})
       
        res.json(records)
    } catch (error) {
        res.send(error)
    }
}


export const deleteUserHelp = async (req, res) => {
    const { id } = req.params;
    try {
        await helpFormModel.findByIdAndDelete(id);
        const user = await usersModel.findById(req.user.id);
        console.log("User:", user);
        const updatedhelp = user.help.filter(item => item != id);
        user.help = updatedhelp;
        await user.save();
        res.status(200).json({ msg: "help Deleted!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateHelp = async (req, res) => {
    const { id } = req.params;
    const { address, city, helpType, numberOfPersons,  } = req.body;
    try {
        await helpFormModel.findByIdAndUpdate(id, {
            address,
            city,
            helpType,
            numberOfPersons,
            // availabilityFrom,
            // availabilityTo,
        });
        res.status(200).json({ msg: "help Updated!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllHelp = async (req, res) => {
    //code here
    try {
      const help = await helpFormModel.find();
      res.status(200).json({ data: help });
    } catch (error) {
      console.log(error.message);
    }
  };