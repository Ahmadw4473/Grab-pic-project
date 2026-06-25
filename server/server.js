const app= require('./src/app')
const connectDB=require('./src/db/db')
require('dotenv').config();

connectDB()

app.listen('3000','0.0.0.0',()=>{
    console.log("server is running on port 3000");
    
})