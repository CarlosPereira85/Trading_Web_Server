
import usersModel from "../models/users.js";
import jobFormModel from "../models/jobFormModel.js";
import mongoose from "mongoose";


export const postJob = async (req, res) => {

    console.log("Jobs:", req.body);

    const {
        contactEmailJob,
        contactPersonJob,
        contactNumberJob,
        TypeOfLanguageJob,
        jobType,
        cityJob,
        jobList,
        jobProvider,
        salaryBasisJob,
        startDateJob,
        endDateJob} = req.body;


    try {
        const user = await usersModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
      console.log(req.body);
        const job = new jobFormModel(
        {contactEmailJob,
        contactPersonJob,
        contactNumberJob,
        TypeOfLanguageJob,
        jobType,
        cityJob,
        jobList,
        jobProvider,
        salaryBasisJob,
        startDateJob,
        endDateJob});

console.log("job:", job);

        await job.save();
        user.job.push(job._id);
        await user.save();
        res.status(200).json({ msg: "job Added!" });
    } catch (error) {
        res.status(500).send("Error");
    }

};


export const getUserJob = async (req, res)=>{

    try {
        const accs = []
        const user = await usersModel.findById(req.user.id);

        user.job.forEach(place=> {
            accs.push(place.toHexString()) 

        })

        const records = await jobFormModel.find({'_id': {$in: accs}})
       
        res.json(records)
    } catch (error) {
        res.send(error)
    }
}


export const deleteUserJob = async (req, res) => {
    const { id } = req.params;
    try {
        await jobFormModel.findByIdAndDelete(id);
        const user = await usersModel.findById(req.user.id);
        console.log("User:", user);
        const updatedjob = user.job.filter(item => item != id);
        user.job = updatedjob;
        await user.save();
        res.status(200).json({ msg: "job Deleted!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { address, city, jobType, numberOfPersons,  } = req.body;
    try {
        await jobFormModel.findByIdAndUpdate(id, {
            address,
            city,
            jobType,
            numberOfPersons,
            // availabilityFrom,
            // availabilityTo,
        });
        res.status(200).json({ msg: "job Updated!" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllJob = async (req, res) => {
    //code here
    try {
      const job = await jobFormModel.find();
      res.status(200).json({ data: job });
    } catch (error) {
      console.log(error.message);
    }
 
  };
