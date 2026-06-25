const uploadFile = require('../services/s3.service')
async function imageUploadController(req,res){
    try{

        await uploadFile({
            file: req.files,
            userId: req.body.userId 
        })
     console.log(req.files)
    }
    catch(error){
        console.log(error)
    }
}


module.exports=imageUploadController