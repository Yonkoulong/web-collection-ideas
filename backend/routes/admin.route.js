const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const auth = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");
const departmentController = require("../controllers/department.controller");
const campaignController = require("../controllers/campaign.controller");
const categoryController = require("../controllers/category.controller")
//useController is exported as array, so we have to loop it.
//forEach is method loop of javascript 

departmentController.forEach((item) =>{
    const { method, route, controller } = item;
    if(item.method =="post" || item.method =="put" || item.method =="delete"){
    router[method](route,verifyJWT,auth.isAdmin, controller);
    }
    else {
        router[method](route,verifyJWT,controller);
    }
})
campaignController.forEach((item) =>{
    const { method, route, controller } = item;
    //router[method](route,verifyJWT,controller);
    if(item.method =="post" || item.method =="put" || item.method =="delete" || item.route=="/campaign/Filter"){
        router[method](route,verifyJWT,auth.isAdmin,controller);
    }
    else {
        router[method](route,verifyJWT,controller);
    }
})
accountController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route,verifyJWT,controller);
    if(item.method =="post" || item.method =="put"||item.method =="delete"){
        router[method](route,verifyJWT,auth.isAdmin,controller);
    }
    else {
        router[method](route,verifyJWT,controller);
    }
})

module.exports = router;