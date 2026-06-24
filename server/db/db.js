const mongoose=require('mongoose')

async function connectDB(){
    try{
    await mongoose.connect(process.env.DB_LINK);
    console.log("connected to data base");
    }
    catch(error){
        console.log("Could not connet to the data base ",error);
    }
}

module.exports=connectDB