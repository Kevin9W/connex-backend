const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // token validation, test middleware function is working
  console.log("activated")
  const bearerHeader = req.headers["authorization"]
  console.log("triggered token check", bearerHeader)

  if (typeof bearerHeader !== "undefined") {
    let bearer = bearerHeader.split(" ")
    let bearerToken = bearer[1]
    req.token = bearerToken
    //use JWT tools to verify the token against secret key
    let verified = jwt.verify(req.token, "waffles")
    console.log("here is the verified token", verified)
    //add userid to the req for use in certain protected routes
    req.userId = verified._id
    next()
  }
  else {
    res.sendStatus(403)
  }
};
