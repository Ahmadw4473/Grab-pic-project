/** Uploading file to S3 and saving the file and file url in users document **/

const imageModel = require('../models/image.model')

//body: { file: Buffer, userId: string }
  async function uploadFile(body) {
    /** Generates a 4 digit random integer */
    const generateRandomNumber = Math.floor(1000 + Math.random() * 9000);
    const fileContent = Buffer.from(body.file.buffer);

    /** Uploading the file to S3 Bucket */
    const s3 = new AWS.S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fileContent,
      Key: `${generateRandomNumber}-${body.userId['userId']}-${body.file['originalname']}`,
    }).promise() 
    

    imageModel.create({
        userid: body.userId['userId'],
        orignalName: body.file['orignalname'],
        imageUrl: uploadResult.Location,
    })

    /** It returns the file key (file name) and file location */
    /** Updating the user document by id - setting s3 file url */
    // return this.userModel.findByIdAndUpdate(body.userId['userId'], {
    //   fileUrl: uploadResult.Location,
    // })
  }
  modules.exports=uploadFile