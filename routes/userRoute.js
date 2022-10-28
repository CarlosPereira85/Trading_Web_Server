import express from "express";
import { createUser } from "../user-controller/signupController.js";
import { loginUser } from "../user-controller/signinController.js";
import { getUser, deleteUser, updateUser, loggedIn, saveContactForm } from "../user-controller/usersController.js";
import auth from "../middle/auth.js";
import { body } from "express-validator";
import { deleteUserPost, updatePost, postPost, getAllPost, getUserPost } from "../user-controller/PostController.js";
import { postHelp, getUserHelp, deleteUserHelp, updateHelp, getAllHelp } from "../user-controller/helpController.js";
import { postJob, getUserJob, deleteUserJob, updateJob, getAllJob } from "../user-controller/jobController.js";

const router = express.Router();




//-------------Users------------
router.post("/signup", [
  body("userName").notEmpty().withMessage("First name is required").trim(),
  body("password", "Password is required and length min 4 chars.")
    .isLength({ min: 4 })
    .custom((val, { req }) => {
      if (val !== req.body.confirm_password) {
        throw new Error("Password don't match!");
      } else {
        return val;
      }
    }),
], createUser

);

router.post("/login", loginUser);
router.get("/user", auth, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


// ------------Accomodation------------
router.get("/getpost", getAllPost);

router.post("/memberprofile", auth);

router.post("/memberprofile/postpost",auth, postPost);
router.get("/memberprofile/getuserpost", auth, getUserPost)
router.delete("/memberprofile/deleteuserpost/:id",auth, deleteUserPost);
router.put("/memberprofile/updatepost/:id", auth, updatePost);

// ------------ContactForm------------

router.post("/contactform", saveContactForm);

// -------------Help------------
router.get("/gethelper", getAllHelp);

router.post("/volunteerformspage/posthelp",auth, postHelp);
router.get("/getuserhelp", auth, getUserHelp)
router.delete("/deleteuserhelp/:id",auth, deleteUserHelp);
router.put("/updatehelp/:id", auth, updateHelp);

// -------------Jobs------------

router.get("/getjob", getAllJob);

router.post("/volunteerformspage/postjob",auth, postJob);
router.get("/getuserjob", auth, getUserJob)
router.delete("/deleteuserjob/:id",auth, deleteUserJob);
router.put("/updatejob/:id", auth, updateJob);



router.get("/autho", auth, loggedIn);


 
// router.post('/email', sendEmail)
  
// router.get("/cache",getCache)
export default router;

