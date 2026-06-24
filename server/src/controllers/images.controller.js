
function imageUploadController(req,res){
    try{
    res.send(req.file)
    }
    catch(error){
        console.log(error)
    }
}

module.exports=imageUploadController