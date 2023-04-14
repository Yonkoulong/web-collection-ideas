const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const categoryController = require("../controllers/category.controller")

ideaController.forEach((item) =>{
    const { method, route, controller } = item;    
    if((item.method !="post" && item.route!="/idea")
    ||(item.method !="put" && item.route!="/idea")
    ){
        router[method](route,verifyJWT,auth.isQAC, controller);
    }
})
commentController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route,verifyJWT,auth.isQAC, controller);
})
categoryController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.route == "/category" && item.method=="get"){
        router[method](route,verifyJWT,auth.isQAC, controller);
     }  
})
module.exports = router;