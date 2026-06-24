const AWS = require('aws-sdk');
const imageModel = require('../models/image.model')

  async function uploadFile(body) {
    try{
    const generateRandomNumber = Math.floor(1000 + Math.random() * 9000);
    const fileContent = Buffer.from(body.file.buffer);

    const s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    
    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fileContent,
      Key: `${generateRandomNumber}-${body.userId}-${body.file.originalname}`,
    }).promise() 
    

    try{
    await imageModel.create({
        userid: body.userId,
        orignalName: body.file.originalname,
        imageUrl: uploadResult.Location,
    })
     console.log("document created")
    }catch(error){
        console.log("Document not created",error);
    }


    }
    catch(error){
        console.log("s3 service error ",error)
    }
    
  }
  module.exports=uploadFile