const express=require('express')
const users=require('./users')

const app=express()
const PORT=9000

app.use(express.json())

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	next();
});
//---AUTH---
app.post('/register', users.auth.register)
app.post('/login', users.auth.login)
app.get('/profile/:user',users.auth.getUserInfo)
app.post('/profile/:user', users.auth.updateUserInfo)

//---PUBLIC---
app.get('/users/:identifier', users.public.getMatch)

app.listen(PORT,()=>{
	console.log(`App listening on Port:${PORT} \nAccess at http://localhost:${PORT}`)
})