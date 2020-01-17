let express=require('express')
let model=require('./model')

let router=express.Router()

router.get('/',(request,response)=>{
	response.status(200).json("get all from users")
	// model.getAll((error,data)=>{
	// 	if (error){
	// 		response.status(500).json({
	// 			status:500,
	// 			message:"Something went wrong",
	// 			error:error,
	// 		})
	// 	}
	// 	else{
	// 		response.status(200).json({
	// 			status:200,
	// 			message:"Success",
	// 			data:data,
	// 		})
	// 	}
	// })
})

module.exports = router;