const mongoose = require('mongoose');
async ()=>{
// Connect to MongoDB
await mongoose.connect('mogodb://localhost:27017/shopping');
}

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username : {type:String, required:true},
  password : {type:String, required:true},
  // email : {type:String, required:true, unique:true},
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username : {type:String, required:true},
  password : {type:String, required:true},
  // email : {type:String, required:true, unique:true},
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title : {type:String, required:true},
  description:{type:String},
  price:{type:Number}
});

const Admin = mongoose.model('Admin', AdminSchema,'Admin');
const User = mongoose.model('User', UserSchema,'User');
const Course = mongoose.model('Course', CourseSchema,'Course');

module.exports = {
  Admin,
  User,
  Course
}
