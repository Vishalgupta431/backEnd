const express=require('express');
const router=express.Router();
router.post('/fooddata',(req,res)=>{
    try{
        res.send([global.fooditems,global.foodcategorys])
    }catch(error){
        console.error(error.message);
        res.send("Server Error")
    }

})
module.exports=router;