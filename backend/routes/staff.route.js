const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const attachmentController = require("../controllers/attachment.controller");
const commentController = require("../controllers/comment.controller");
const reactionController = require("../controllers/reaction.controller");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const auth = require("../middleware/auth.middleware");
const categoryController = require("../controllers/category.controller")

ideaController.forEach((item) =>{
    const { method, route, controller } = item;    
    if((item.method =="post" && item.route=="/idea")
    ||(item.method =="put" && item.route=="/idea")
    ){
        router[method](route,verifyJWT,auth.isStaff, controller);
    }
    else {
        router[method](route,verifyJWT, controller);
    }
})
attachmentController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.route != "/csvFile"){ 
        router[method](route,verifyJWT,auth.isStaff, controller);
    }
})
reactionController.forEach((item) =>{
    
    const { method, route, controller } = item;
    router[method](route,verifyJWT,auth.isStaff, controller);
})

module.exports = router;