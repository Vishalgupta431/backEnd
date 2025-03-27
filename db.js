require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL;

const mongodb = async () => {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
        
        const foodItemsCollection = mongoose.connection.db.collection("fooditems");
        const data= await foodItemsCollection.find({}).toArray();
            // if (err) {
            //     console.error("Error fetching food items:", err);
            //     return;
            // }
            // console.log("Food items fetched successfully",data);

            const foodcategorys = mongoose.connection.db.collection("foodcategorys");
            const catdata= await foodcategorys.find({}).toArray();
                // if (err) {
                //     console.error("Error fetching food categories:", err);
                //     return;
                // }
                console.log("food category add ",catdata);
            

                global.fooditems = data;
                global.foodcategorys = catdata;

                // console.log("Fetched food items and categories successfully");
            
        
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongodb;
