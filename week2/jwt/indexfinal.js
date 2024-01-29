const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtPassword = 'secret';


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
todos = [];
function signJwt(Inputusername, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
  
    if(password.length>6 &&  emailRegex.test(Inputusername)){
      const todos = JSON.parse(fs.readFileSync('./index.json','utf-8'));
      console.log(typeof todos)
      // todos=JSON.parse(data);
      
      console.log(todos);
      const usernameIndex = todos.findIndex((todo)=>todo.username === Inputusername)
      console.log(usernameIndex);
      console.log(todos[usernameIndex]);
      if(todos[usernameIndex].password===password){
        const payload = { Inputusername, password };
        const token = jwt.sign(payload, jwtPassword);
          console.log("success");
        return token;
      }
      else{
        console.log("fail");
      }
    }
    else{
      return null;
    }

    // Generate JWT using the provided username and password
    
  }
  
var d = signJwt("sachin123@gmail.com","sachin1234");
console.log(d);
/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try {
      // Verify the token using the secret key
      jwt.verify(token, jwtPassword);
      return true; // Token is valid
    } catch (err) {
      return false; // Token is invalid, expired, or not verified
    }
  }
  

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    try {
      // Decode the payload without verifying authenticity
      const decodedPayload = jwt.decode(token);
      return decodedPayload; // Return decoded payload
    } catch (err) {
      return false; // Token is not a valid JWT format
    }
  }
  


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
