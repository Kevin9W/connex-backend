let model = require("./model");
//---Search---
function getMatch(request, response){
  let info = request.params.identifier
  if (!info){
    return response.status(400).json({
      status: 400,
      message: "Bad Request!",
    });
  }
  else {
    model.getMatchUsers(info, (error, userData) => {
      if (error) {
        return response.status(500).json({
          status: 500, message: 'Something went wrong. Please try again.'
        })
      }
      let i=0
      for (let user of userData){
        model.getUserTags(user.user_login,(error,tagsData)=>{
          if (error) {
            return response.status(500).json({
              status: 500, message: 'Something went wrong. Please try again.'
            })
          }
          user.tags=[]
          for (let tag of tagsData){
            user.tags.push(tag.tags)

          }
          i++
          if (i===userData.length){
            return response.status(200).json({
              status: 200,
              message: "Success!",
              data: userData,
            });
          }
        })
      }
    })
  }
} 

module.exports={
  getMatch
}