// Middleware for handling auth
const {Admin, User, Course }= require('../db/index')
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  // console.log(req.headers.names);
  const username = req.body.username;
  const password = req.body.password;


  try {
    const admin = await Admin.findOne({ username, password });
    console.log(admin);

    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
      // return false;
    }

    // return true;
    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = adminMiddleware;
