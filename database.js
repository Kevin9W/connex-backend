const sqlite3=require('sqlite3')
const database=new sqlite3.Database('./database.db')
//---Create Table Queries---
const createUsersTableQuery='CREATE TABLE IF NOT EXISTS users (user_login TEXT UNIQUE, email TEXT UNIQUE, pass_hash TEXT UNIQUE, date_registered TEXT, last_login TEXT, description TEXT, public INTEGER)'

const createTagsTableQuery='CREATE TABLE IF NOT EXISTS tags (tags TEXT UNIQUE)'

const createCirclesTableQuery='CREATE TABLE IF NOT EXISTS circles (public INTEGER)'

const createSATableQuery='CREATE TABLE IF NOT EXISTS social_accounts (st_id INTEGER, identifier TEXT, u_id INTEGER, UNIQUE (st_id, identifier, u_id))'

const createSTTableQuery='CREATE TABLE IF NOT EXISTS social_types (type TEXT UNIQUE)'

const create_u_c_TableQuery='CREATE TABLE IF NOT EXISTS u_c (u_id INTEGER, c_id INTEGER)'

const create_u_t_TableQuery='CREATE TABLE IF NOT EXISTS u_t (u_id INTEGER, t_id INTEGER)'

const create_c_sa_TableQuery='CREATE TABLE IF NOT EXISTS c_sa (c_id INTEGER, sa_id INTEGER)'

//---Create Tables---
database.run(createUsersTableQuery,error=>{
  if (error) console.error(new Error("Create users table failed."), error); 
  else console.log("Create users table succeeded");
})

database.run(createTagsTableQuery,error=>{
  if (error) console.error(new Error("Create tags table failed."), error); 
  else console.log("Create tags table succeeded");
})

database.run(createCirclesTableQuery,error=>{
  if (error) console.error(new Error("Create circles table failed."), error); 
  else console.log("Create cirlces table succeeded");
})

database.run(createSATableQuery,error=>{
  if (error) console.error(new Error("Create social_accounts table failed."), error); 
  else console.log("Create table succeeded");
})

database.run(createSTTableQuery,error=>{
  if (error) console.error(new Error("Create social_type table failed."), error); 
  else console.log("Create social_type table succeeded");
})

database.run(create_u_c_TableQuery,error=>{
  if (error) console.error(new Error("Create u_c table failed."), error); 
  else console.log("Create u_c table succeeded");
})

database.run(create_u_t_TableQuery,error=>{
  if (error) console.error(new Error("Create u_t table failed."), error); 
  else console.log("Create u_t table succeeded");
})

database.run(create_c_sa_TableQuery,error=>{
  if (error) console.error(new Error("Create c_sa table failed."), error); 
  else console.log("Create c_sa table succeeded");
})

module.exports=database
