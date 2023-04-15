const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const categoryController = require("../controllers/category.controller")
const attachmentController = require("../controllers/attachment.controller");
const auth = require("../middleware/auth.middleware");
const verifyJWT = require("../middleware/verifyJWT.middleware");

categoryController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.method=="post" || item.method =="put"|| item.method=="delete"){
        router[method](route,verifyJWT,auth.isQAM, controller);
    }    
    else {
        router[method](route,verifyJWT,controller);
    }
})
attachmentController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.route=="/csvFile"){ 
        router[method](route,verifyJWT,auth.isQAM, controller);
    }
})

module.exports = router;