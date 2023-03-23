const cloudinary = require('cloudinary').v2;
//const cloudinary = require("../middleware/cloudinary.middleware")
const AttachmentModel = require("../models/attachment.model")
const AccountModel = require("../models/account.model");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const postAttachment = async(req, res) =>{
     try {
        let response
        const fileData = req.files.file
        const ideaId = req.params.ideaId
        const result = await cloudinary.uploader.upload(fileData.tempFilePath,{
          resource_type:"auto",
          folder:"web_collection_ideas",
        })
        let newAttachment= await AttachmentModel.create({
          publishId:result.public_id,
          url:result.secure_url,
          authorId:req.id,
          ideaId:ideaId
        })
        if(newAttachment){
          response = {
            'status': 'Upload new file success',
            'data': newAttachment
          }   
        }
        console.log(fileData.tempFilePath);
        res.status(200).json(response)
     } catch (error) {
      res.status(500).json(error.message)
     }
};
const deleteAttachment = async(req, res)=>{
  try {
    // destroy cloud
     let id = req.params.id
     let findAttachment = AccountModel.findOne({ _id: id });
      await cloudinary.uploader.destroy(findAttachment.publishId)
    // destroy DB
     await AttachmentModel.findByIdAndDelete({_id:id})
     let response = {
      'status': 'Delete file success',  
    }   
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
};
module.exports = [
    {
      method: "post", //define method http
      controller: postAttachment, //this is method handle when have request on server
      route: "/file", //define API
    },
    {
      method: "delete", //define method http
      controller: deleteAttachment, //this is method handle when have request on server
      route: "/file/:id", //define API
    }
  ]