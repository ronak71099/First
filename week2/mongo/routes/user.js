const { Router } = require("express");
const mongoose = require('mongoose');
const { Admin, User, Course } = require('../db/index');
const userMiddleware = require("../middleware/user");
const express = require('express');
const app = express();
const router = Router();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/shopping');
// Admin Routes
router.post('/signup',async (req, res) => {
  // Implement admin signup logic
  try {
    let username = req.body.username;
    let password = req.body.password;
  
    let signupData = {
      username,
      password
    }
    let userData = new User(signupData);
    await userData.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }

});

router.post('/courses', userMiddleware,async (req, res) => {
  // Implement course creation logic
  if(req.user){
    let title = req.body.title;
    let course = await Course.find({title});
    if(!course){
      res.json("invalid course");
    }
    else{
      res.json("course paaa gaya");
    }
  }else{
    res.json("Invalid User");
  }


});

router.get('/courses', userMiddleware, async (req, res) => {
  try {
    // Fetch all courses logic here
    let courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
