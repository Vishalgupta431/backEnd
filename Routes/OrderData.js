const express=require('express')
const router=express.Router()
const Order=require('../models/Orders')

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})


    let eId=await Order.findOne({'email':req.body.email})
    console.log(eId)
    if (eId===null) {
        try{
            await Order.create({
                email:req.body.email,
                order_date:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch(error){
            console.log(error.message)
            res.send("Server Error",error.message)
        }       
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}
            ).then(()=>{
                res.json({success:true})
            })
            
        }catch(error){
            res.send("Server Error",error.message)
            console.log(error.message)

        }
    }
})
 // Adjust the path as necessary

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.status(404).send('No order data found');
        }
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

