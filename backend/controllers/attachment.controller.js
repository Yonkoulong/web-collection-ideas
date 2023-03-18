const cloudinary = require('cloudinary').v2;
const AttachmentModel = require("../models/attachment.model")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const postAttachment = async(req, res) =>{
     try {
        const fileData = req.files.file
        const result = await cloudinary.uploader.upload(fileData.tempFilePath,{
          resource_type:"raw",
          folder:"web_collection_ideas",

        })
        // AttachmentModel.create({
         
        // })
        let response = {
            'status': 'Upload new file',
            'data': result
          }   
        res.status(200).json(response)
     } catch (error) {
        
     }
}
module.exports = [
    {
      method: "post", //define method http
      controller: postAttachment, //this is method handle when have request on server
      route: "/file", //define API
    }
  ]