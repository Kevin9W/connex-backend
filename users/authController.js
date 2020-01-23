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
            let user = {
              user_login: request.body.user_login
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
                  message: "Successfully registerd and logged in!",
                  user_login: request.body.user_login,
                  signedJwt
                })
              }
            )
            // return response.status(200).json({
            //   status: 200,
            //   message: "Successfully Registered!"
            // });
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
          user_login: foundUser.user_login
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
              message: "Successfully logged in!",
              user_login: foundUser.user_login,
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
//---Get One User Info---
function getUserInfo(request,response){
  let name=request.params.user
  if (!name){
    return response.status(400).json({
      status: 400,
      message: "Bad Request!"
    })
  }
  model.getUserInfo(name,(error,userData)=>{
    if(error){
      console.log(error)
      return response.status(500).json({
        status: 500,
        message: "Something went wrong!"
      })
    }
    
    model.getUserTags(name,(error,tagsData)=>{
      if (error) {
        console.log(error)
        return response.status(500).json({
          status: 500,
          message: "Something went wrong!"
        })
      }
      let tagsSend=[]
      for (let tag of tagsData){
        tagsSend.push(tag.tags)
      }
      userData.tags = tagsSend
      return response.status(200).json({
        status: 200,
        message: "Success!",
        data: userData,
      })
    })
  })
}
function updateUserInfo(request,response){
  let name = request.params.user
  let userData = [request.body.description, request.body.public, name]
  let tagsData=request.body.tags
  if (!name) {
    return response.status(400).json({
      status: 400,
      message: "Bad Request!"
    })
  }
  model.updateUserInfo(userData, (error) => {
    if (error) {
      return response.status(500).json({
        status: 500,
        message: "Something went wrong!"
      })
    }
    for(let tag of tagsData){
      let u_tInfo=[request.body.id]
      model.getTagsOid([tag],(error,id)=>{
        if (error) {
          return response.status(500).json({
            status: 500,
            message: "Something went wrong!"
          })
        }
        if(id){
          u_tInfo.push(id.rowid)
          model.update_u_t(u_tInfo,(error)=>{
            if (error) {
              return response.status(500).json({
                status: 500,
                message: "Something went wrong!"
              })
            }
          })
        }
        else{
          model.createTags([tag],(error)=>{
            if (error) {
              return response.status(500).json({
                status: 500,
                message: "Something went wrong!"
              })
            }
            model.getTagsOid([tag], (error, id) => {
              if (error) {
                return response.status(500).json({
                  status: 500,
                  message: "Something went wrong!"
                })
              }
              u_tInfo.push(id.rowid)
              model.update_u_t(u_tInfo, (error) => {
                if (error) {
                  return response.status(500).json({
                    status: 500,
                    message: "Something went wrong!"
                  })
                }
              })
            })
          })
        }
      })
    }
    return response.status(200).json({
      status: 200,
      message: "Success!"
    })
  })
}

module.exports={
  register,
  login,
  getUserInfo,
  updateUserInfo,
}