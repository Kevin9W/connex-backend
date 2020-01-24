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
	SELECT user_login, users.rowid AS 'id', email, date_registered, description, public
	FROM users
	WHERE user_login=?`
	database.get(getUserInfoQuery, name, callback)
}
function getUserTags(name, callback) {
	let getUserTagsQuery = `
	SELECT tags
	FROM tags
	JOIN u_t ON tags.oid = t_id
	JOIN users ON users.oid = u_id
	WHERE user_login=?`
	database.all(getUserTagsQuery, name, callback)
}
function getMatchUsers(info, callback){
	let getMatchUsersQuery=`
	SELECT DISTINCT user_login, users.oid, description
	FROM users
	LEFT JOIN u_t ON users.oid=u_id
	LEFT JOIN tags ON tags.oid=t_id
	WHERE (user_login LIKE ? OR tags LIKE ?) AND public=1`
	database.all(getMatchUsersQuery, [`%${info}%`, `%${info}%`], callback)
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
	SET description=?, public=? 
	WHERE user_login=?`
	database.run(updateUsersInfoQuery,data,callback)
}
function getTagsOid(data,callback){
	let getTagsOidQuery=`
	SELECT tags.rowid
	FROM tags
	WHERE tags=?`
	database.get(getTagsOidQuery,data,callback)
}
function createTags(data,callback) {
	let createTagsQuery=`
	INSERT INTO tags VALUES (?)`
	database.run(createTagsQuery, data,callback)
}
function delete_u_t_entries(id,callback){
	let delete_u_t_entriesQuery=`
	DELETE FROM u_t
	WHERE u_id=?`
	database.run(delete_u_t_entriesQuery,id,callback)
}
function update_u_t(data,callback){
	let update_u_t_Query=`
	INSERT INTO u_t VALUES(?,?)`
	database.run(update_u_t_Query,data,callback)
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
	updateUserInfo, createTags, getTagsOid, 
	update_u_t, getUserTags, delete_u_t_entries
}