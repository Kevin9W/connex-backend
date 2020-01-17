const database=require('../database')

//---FINDING---
function getAll(callback){
	let getAllQuery=`
	SELECT users.oid, user_login, email, description
	FROM users 
	WHERE public=1`
	database.all(getAllQuery,callback)
}
//---Create new user
function getOneReg(info,callback){
	let getOneRegQuery=`
	SELECT user_login, email
	FROM users
	WHERE user_login=? email=?`
	database.get(getOneRegQuery,info,callback)
}
function newReg(info,callback){
	let newRegQuery=`
	INSERT INTO users (?,?,?,?,"",0)`
	database.run(newRegQuery,info,callback)
}
module.exports={
	getAll,getOneReg,newReg
}