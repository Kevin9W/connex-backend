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
function getUserInfo(name,callback){
	let getUserInfoQuery=`
	SELECT user_login, users.rowid AS 'id', email, date_registered, description, tags, public
	FROM users
	LEFT JOIN u_t ON users.oid = u_id
	LEFT JOIN tags ON tags.oid = t_id
	WHERE user_login=?`
	database.get(getUserInfoQuery, name, callback)
}
function getMatchUsers(info, callback){
	let getMatchUsersQuery=`
	SELECT user_login, users.oid, description, tags
	FROM users
	LEFT JOIN u_t ON users.oid=u_id
	LEFT JOIN tags ON tags.oid=t_id
	WHERE (user_login LIKE '%`+info+`%' OR tags LIKE '%`+info+`%') AND public=1`
	database.all(getMatchUsersQuery, callback)
}
//---Update Login Date---
function updateLoginDate(info,callback){
	info.unshift(Date())
	let updateLoginDateQuery = `
	UPDATE users
	SET last_login=?
	WHERE user_login =?`
	database.run(updateLoginDateQuery, info, callback)
}
function updateUserInfo(data,callback){
	let updateUsersInfoQuery=`
	UPDATE users
	SET description= ?
	WHERE user_login= ?`
	database.run(updateUsersInfoQuery,data,callback)
}
function updateTagsInfo(data,callback) {
	let updateTagsInfo=`
	INSERT INTO tags VALUES (?)`
}
//---Register New User---
function getOneLogin_Email(info,callback){
	let getOneLogin_EmailQuery=`
	SELECT user_login, email
	FROM users
	WHERE user_login=? OR email=?`
	database.get(getOneLogin_EmailQuery,info,callback)
}
function newReg(info,callback){
	let newRegQuery=`
	INSERT INTO users VALUES (?,?,?,?,?,"",0)`
	database.run(newRegQuery,info,callback)
}
module.exports={
	getAll,getOneLogin_Email,newReg,getLogin,
	updateLoginDate,getMatchUsers,getUserInfo,
	updateUserInfo, updateTagsInfo
}