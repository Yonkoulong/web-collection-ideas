const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const categoryController = require("../controllers/category.controller")


commentController.forEach((item) =>{
    const { method, route, controller } = item;
    if( item.method=="delete"){
        router[method](route,verifyJWT,auth.isQAC, controller);
    }
    else {
        router[method](route,verifyJWT, controller);
    }
})

module.exports = router;