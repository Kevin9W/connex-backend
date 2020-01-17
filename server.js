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

app.get('/api', (request, response)=>{
	response.status(200).send("I'm the back end!")
})

app.post('/register',users.auth.register)

app.listen(PORT,()=>{
	console.log(`App listening on Port:${PORT} \nAccess at http://localhost:${PORT}`)
})