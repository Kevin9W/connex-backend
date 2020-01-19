let model=require('./model')
let validate=require('../validation/register')
let bcrypt=require('bcryptjs')
let jwt=require('jsonwebtoken')
//---Registration---
function register(request,response){
  let {errors,notValid}=validate(request.body)
  if (notValid){
    return response.status(500).json({status:500, message:'Something went wrong. Please try again.',errors})
  }
  let newUser=[request.body.user_login,request.body.email]
  model.getOneLogin_Email(newUser,(error,foundUser)=>{
    if(error){
      return response.status(500).json({
        status: 500, message:'Something went wrong. Please try again.'
      })
    }
    if (foundUser){
      let foundError = {status: 400, errors:[]}
      if (foundUser.user_login===request.body.user_login){
        foundError.errors.push({message:"Username is already taken."})
      }
      if (foundUser.email===request.body.email) {
        foundError.errors.push({message:"Email is already registered."})
      }
      return response.status(400).json(foundError)
    }
    bcrypt.genSalt(10,(error,salt)=>{
      if (error){
        return response.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again."
        });
      }
      bcrypt.hash(request.body.password, salt, (error,hash)=>{
        if (error) {
          return response.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again."
          });
        }
        newUserInfo=[request.body.user_login,request.body.email, hash ,Date(),Date()]
        model.newReg(newUserInfo,(error)=>{
          if (error) {
            console.log(error)
            return response.status(500).json({
              status: 500,
              message: "Something went wrong. Please try again."
            });
          }
          else{
            return response.status(200).json({
              status: 200,
              message: "Successfully Registered!"
            });
          }
        })
      })
    })
  })
}
//---Login---
function login(request,response){
  if (!request.body.user_login || !request.body.password) {
    return response.status(400).json({ status: 400, message: "Please enter your username and password" });
  }
  let loginInfo = [request.body.user_login]
  model.getLogin(loginInfo,(error,foundUser)=>{
    if (error){
      return response.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again."
      });
    }
    if (!foundUser){
      return response.status(400).json({
        status: 400,
        message: "Username or Password was incorrect."
      })
    }
    bcrypt.compare(request.body.password, foundUser.pass_hash, (error,isMatch)=>{
      if (error) {
        return response.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again."
        });
      }
      if (isMatch) {
        model.updateLoginDate([foundUser.user_login],error=>{
          if (error) {
            console.log(error)
          }
        })
        let user = {
          username: foundUser.user_login
        }
        jwt.sign(
          user,
          "Bawooga Whales",
          {
            expiresIn: "12h"
          },
          (err, signedJwt) => {
            return response.status(200).json({
              status: 200,
              message: "Successfully logged in",
              username: foundUser.user_login,
              signedJwt
            })
          }
        )
      }
      else{
        return response.status(400).json({
          status: 400,
          message: "Username or Password was incorrect."
        })
      }
    })
  })
}
//---Forgot Password---

module.exports={
  register,
  login,
}