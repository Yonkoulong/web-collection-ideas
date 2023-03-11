const AttachmentModel = require("../models/attachment.model")
const uploadCloud = require("../middleware/uploadCloud.middleware");
const postFile = async(req, res) =>{
     try {
         
        const fileData = req.file
        response = {
            'status': 'Upload new file',
            'data': fileData
          }   
        res.status(200).json(response)
     } catch (error) {
        
     }
}
module.exports = [
    {
      method: "post", //define method http
      controller: postFile, //this is method handle when have request on server
      route: "/file", //define API
    }
  ]