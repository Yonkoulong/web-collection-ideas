const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const auth = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");
const departmentController = require("../controllers/department.controller");
const campaignController = require("../controllers/campaign.controller");
//useController is exported as array, so we have to loop it.
//forEach is method loop of javascript 

departmentController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route,verifyJWT,auth.isAdmin, controller);
})
campaignController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route,verifyJWT, controller);
})
accountController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.method =="post" && item.route=="/account"){
        router[method](route,verifyJWT,auth.isAdmin,controller);
    }
    
})
ideaController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.method =="post" && item.route=="/account"){
        router[method](route,verifyJWT,auth.isAdmin,controller);
    }
})
router.get('/admin',(req,res)=>{
    res.json('Hello admin')
})
module.exports = router;