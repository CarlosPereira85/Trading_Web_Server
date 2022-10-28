import mongoose from "mongoose";


const jobFormSchema = new mongoose.Schema({
  
    contactEmailJob: {
        type: String,
       // required: true

    },
    contactPersonJob: {
        type: String,
      //  required: true

    },
    contactNumberJob: {
        type: String,
     //   required: true

    },
    TypeOfLanguageJob: {
        type: String,
    //    required: true

    },
    cityJob: {
        type: String,
     //   required: true,
        // minlength: 6
    },
    jobType: {
        type: String,
    //    required: true,
        // minlength: 6
    },
    jobList: {
        type: String,
    //    required: true,
        // minlength: 6
    },
    jobProvider: {
        type: String,
    //    required: true,
        // minlength: 6
    },
    salaryBasisJob: {
        type: String,
   //     required: true,
        // minlength: 6
    },
    startDateJob: {
        type: String,
    } ,
    endDateJob: {
        type: String,
    } ,
});

const jobFormModel = mongoose.model("job", jobFormSchema);

export default jobFormModel;