const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.controller");
const ideaController = require("../controllers/idea.controller");
const commentController = require("../controllers/comment.controller");
const reactionController = require("../controllers/reaction.controller");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const uploadCloud = require("../middleware/uploadCloud.middleware");
const fileController = require("../controllers/attachment.controller");
//useController is exported as array, so we have to loop it.
//forEach is method loop of javascript 
staffController.forEach((item) => {
    //next, each item is element of useController or called a method which can handle a things
    //i use descstructuring declare from javascript ES6
    const { method, route, controller } = item;
    router[method](route,controller);
    
    //C2
    // router[item.method](item.routeName, item.controller);
});
ideaController.forEach((item) =>{
   
    const { method, route, controller } = item;
    router[method](route,verifyJWT, controller);
})
fileController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route, controller);
    // if(item.method =="post" && item.route=="/file" ){
    //     router[method](route,uploadCloud.single('file'), controller);
    // }
    // else{
        
    //}
   
})
commentController.forEach((item) =>{
    
    const { method, route, controller } = item;
    router[method](route, controller);
})
reactionController.forEach((item) =>{
   
    const { method, route, controller } = item;
    router[method](route, controller);
})
router.get('/staff',(req,res)=>{
    res.json('Hello staff')
})
module.exports = router;