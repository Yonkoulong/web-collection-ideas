const cloudinary = require('cloudinary').v2;
//const cloudinary = require("../middleware/cloudinary.middleware")
const AttachmentModel = require("../models/attachment.model")
const AccountModel = require("../models/account.model");
const IdeaModel = require("../models/idea.model");
const fs = require('fs-extra');
const { parse } = require('json2csv');
const path = require('path')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const postAttachment = async(req, res) =>{
     try {
        let response
        const fileData = req.files.file
        const ideaId = req.body.ideaId
        const authorId = req.id
        const result = await cloudinary.uploader.upload(fileData.tempFilePath,{
          resource_type:"auto",
          folder:"web_collection_ideas",
        })
        let newAttachment= await AttachmentModel.create({
          type:result.resource_type,
          publishId:result.public_id,
          url:result.secure_url,
          authorId:authorId,
          ideaId:ideaId

        })
        if(!newAttachment) return res.sendStatus(406);
        let updateIdea = await IdeaModel.updateOne(
          { _id: ideaId },
          { $push: { attachment: newAttachment._id } }
        )
        if(!updateIdea) return res.sendStatus(404);
          response = {
            'status': 'Upload new file success',
            'data': result
          }    
        console.log(fileData.tempFilePath);
        res.status(200).json(response)
     } catch (error) {
      res.status(500).json(error.message)
     }
};
exports.getAttchmentById = async(req, res)=>{
    
}
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
function uniqueFileName(filePath1,filePath2,filePath3,file)
{
    let id = 1;
    let test = path.join(filePath1,filePath2,filePath3,file + id++ +'.csv');
    while (fs.existsSync(test))
    {
        test = path.join(filePath1,filePath2,filePath3,file + id++ +'.csv');
    }
    return test;
}
const getCSVfile = async(req, res)=>{
    try {
         let idea = await IdeaModel.find({})
         if(idea){
          const fields = ['id','content','viewer','creater','category','campaign', 'enonymously']
          const opts = {fields}
          const csv=parse(idea, opts)
          //
          let csvFile= fs.writeFile(path.join(uniqueFileName(__dirname,'..','CSV','csvFile')), csv, function(error){
            if(error) throw error
           
          })
          fs.readFile('JournalDEV.txt', 'utf8', function(err, data) {
            console.log(data);
          });
          const result = await cloudinary.uploader.upload(csvFile,{
            resource_type:"auto",
            folder:"web_collection_ideas",
          })
          let response = {
            'status': 'Download CSV file success',  
             'data': result.url
            
          }   
          res.status(200).json(response)
         }

    } catch (error) {
      res.status(500).json(error.message)
    }
}
module.exports = [
    {
      method: "post", //define method http
      controller: postAttachment, //this is method handle when have request on server
      route: "/file", //define API
    },
    {
      method: "get", //define method http
      controller: getCSVfile, //this is method handle when have request on server
      route: "/csvFile", //define API
    },
    {
      method: "delete", //define method http
      controller: deleteAttachment, //this is method handle when have request on server
      route: "/file/:id", //define API
    }
  ]