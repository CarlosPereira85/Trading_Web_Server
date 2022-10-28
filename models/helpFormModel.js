import mongoose from "mongoose";




const helpFormSchema = new mongoose.Schema({
    addressHelp: {
        type: String,
       

    }
    ,
    contactEmailHelp: {
        type: String,
        

    }
    ,
    contactNumberHelp: {
        type: String,
        

    }
    ,
    contactPersonHelp: {
        type: String,
      

    }
    ,


    cityHelp: {
        type: String,
        
        // minlength: 6
    },
    TypeOfLanguageHelp: {
        type: String,
        
        // minlength: 6
    },
    orgHelp: {
        type: String,
       
        // minlength: 6
    },
    helpType: {
        type: String,
       
        // minlength: 6
    },

    startDateHelp: {
        type: String,
        
    } ,
    endDateHelp: {
    type: String,
        
    } 




});

const helpFormModel = mongoose.model("help", helpFormSchema);

export default helpFormModel;