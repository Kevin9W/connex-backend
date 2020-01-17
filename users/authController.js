let model=require('./model')
let validate=require('../validation/register')
let bcrypt=require('bcryptjs')

let register = ((request,response)=>{
  let {errors,notValid}=validate(request.body)
  if (notValid){
    return response.status(500).json({status:500,errors})
  }
  let newUser=[request.body.user_login,request.body.email]
  model.getOneReg(newUser,(error,foundUser)=>{
    if(error){
      return response.status(500).json({status:500,error
      })
    }
    if (foundUser){
      let foundError = {status: 400}
      if (foundUser.user_login){
        foundError.userError = "Username already exists"
      }
      if (foundUser.email) {
        foundError.emailError = "Email is already registered"
      }
      return response.status(400).json(foundError)
    }
    bcrypt.genSalt(10,(error,salt)=>{
      if (error){
        return response.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again"
        });
      }
      bcrypt.hash(request.body.password, salt, (error,hash)=>{
        if (error) {
          return response.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again"
          });
        }
        newUserInfo=[request.body.user_login,request.body.email, hash ,Date()]
        model.newReg(newUserInfo,(error)=>{
          if (error) {
            return response.status(500).json({
              status: 500,
              message: "Something went wrong. Please try again"
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
})

module.exports={
  register
}