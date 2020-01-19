let model=require('./model')
let validate=require('../validation/email')
//---Forgotten Password---
function forgotPass(request, response) {
  let { errors, notValid } = validate(request.body)
  if (notValid) {
    return response.status(500).json({ status: 500, message: 'Something went wrong. Please try again.', errors })
  }
  let info=[request.body.user_login,request.body.email]
  model.getOneLogin_Email(info,(error,foundUser)=>{
    if (error) {
      return response.status(500).json({
        status: 500, message: 'Something went wrong. Please try again.'
      })
    }
    if (!foundUser){
      return response.status(500).json({
        status: 400, message: 'Username or Email not registered.'
      })
    }
    if (foundUser) {
      return response.status(200).json({
        status: 200, message: 'A reset password has been sent to your email!'
      })
    }
  })
} 
module.exports={
  forgotPass,
}
