// const { Router, json } = require("express");
// const adminMiddleware = require("../middleware/admin");
// const {Admin, User, Course }= require('../db/index')
// const fs = require('fs');
// const { default: mongoose } = require("mongoose");
// const router = Router();

// // Admin Routes
// router.post('/signup',async (req, res) => {
//   // Implement admin signup logic
//   let username = req.headers.username;
//   let password = req.headers.password;
//   let email  = req.headers.email;
//   let signupData = {
//     username,
//     password,
//     email
//   }
//   await mongoose.connect('url')
//   let d = new User(signupData);
//   d.save();
//   // fs.writeFileSync('./data.json',JSON.stringify(signupData,null, 1),'utf-8');
// });

// router.post('/courses', adminMiddleware, async(req, res) => {
//   // Implement course creation logic
//   let title = req.body.title;
//   let description = req.body.description;
//   let price = req.body.price;
//   let courseData = {
//     title,
//     description,
//     price
//   }
//   await mongoose.connect('url')
//   let d = new User(courseData);
//   d.save();
//   // fs.writeFileSync('./data.json',JSON.stringify(courseData, null, 1),'utf-8');
// });

// router.get('/courses', adminMiddleware, (req, res) => {
//   // Implement fetching all courses logic
//   let title = req.body.title;
//   let description = req.body.description;
//   let price = req.body.price;
//   let courseData = {
//     title,
//     description,
//     price
//   }
//   res.status(200).send(courseData);
// });


// module.exports = router;


const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require('../db/index');
const express = require('express');
const mongoose = require('mongoose');
const router = Router();
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shopping');

// Middleware to parse JSON in the request body
app.use(express.json());

// Admin Routes
router.post('/signup', async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    // let email = req.body.email;
    let signupData = {
      username,
      password
    }
    let admin = new Admin(signupData);
    await admin.save();
    res.status(201).json("Admin created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  try {
  //   let username = req.body.username;
  //   let password = req.body.password;
  //   let email = req.body.email;
  //   let signupData = {
  //     username,
  //     password,
  //     email
  //   }
    
  //   const data = await Admin.find({signupData})
    if(req.admin){
      
      let title = req.body.title;
      let description = req.body.description;
      let price = req.body.price;
      let courseData = {
        title,
        description,
        price
      }
      let course = new Course(courseData);
      await course.save();
      res.status(201).json("Course bann gaya hai jao dekh lo");
    }
    else{
      console.log("Admin ki jankaari data me nahi hai");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
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
