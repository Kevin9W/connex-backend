const database=require('../database')

//---Finding---
function getAll(callback){
	let getAllQuery=`
	SELECT users.oid, user_login, email, description
	FROM users 
	WHERE public=1`
	database.all(getAllQuery,callback)
}
function getLogin(info,callback){
	let getLoginQuery=`
	SELECT user_login, pass_hash
	FROM users
	WHERE user_login=?`
	database.get(getLoginQuery,info,callback)
}
//---Register New User---
function getOneReg(info,callback){
	let getOneRegQuery=`
	SELECT user_login, email
	FROM users
	WHERE user_login=? OR email=?`
	database.get(getOneRegQuery,info,callback)
}
function newReg(info,callback){
	let newRegQuery=`
	INSERT INTO users VALUES (?,?,?,?,?,"",0)`
	database.run(newRegQuery,info,callback)
}

module.exports={
	getAll,getOneReg,newReg,getLogin
}