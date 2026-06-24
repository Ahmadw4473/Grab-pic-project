// const uploadFile = require('')
async function imageUploadController(req,res){
    try{
        await uploadFile({
            file: req.file,
            userId: req.userId 
        })
     res.send("file sent to the service")
    }
    catch(error){
        console.log(error)
    }
}

module.exports=imageUploadController