const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const categoryController = require("../controllers/category.controller")
const attachmentController = require("../controllers/attachment.controller");
const auth = require("../middleware/auth.middleware");
const verifyJWT = require("../middleware/verifyJWT.middleware");

ideaController.forEach((item) =>{
    const { method, route, controller } = item;    
    if(!(item.method =="post" && item.route=="/idea")
    ||!(item.method =="put" && item.route=="/idea")
    ){
        router[method](route,verifyJWT,auth.isQAM, controller);
    }
})
categoryController.forEach((item) =>{
    const { method, route, controller } = item;    
    router[method](route,verifyJWT,auth.isQAM, controller);
})
attachmentController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.route=="/csvFile"){ 
        router[method](route,verifyJWT,auth.isQAM, controller);
    }
})
module.exports = router;