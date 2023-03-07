const AttachmentModel = require("../models/attachment.model")

const postFile = async(req, res) =>{
    
}
module.exports = [
    {
      method: "post", //define method http
      controller: postFile, //this is method handle when have request on server
      route: "/file", //define API
    }
  ]