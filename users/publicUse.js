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
    model.getMatchUsers(info, (error, data) => {
      if (error) {
        return response.status(500).json({
          status: 500, message: 'Something went wrong. Please try again.'
        })
      }
      else {
        return response.status(200).json({
          status: 200,
          message: "Success!",
          data: data,
        });
      }
    })
  }
} 

module.exports={
  getMatch
}