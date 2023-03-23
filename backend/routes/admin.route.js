const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const ideaController = require("../controllers/idea.controller");
const verifyJWT = require("../middleware/verifyJWT.middleware");
const auth = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");
const departmentController = require("../controllers/department.controller");
const campaignController = require("../controllers/campaign.controller");
//useController is exported as array, so we have to loop it.
//forEach is method loop of javascript 
adminController.forEach((item) => {
    //next, each item is element of useController or called a method which can handle a things
    //i use descstructuring declare from javascript ES6
    const { method, route, controller } = item;
    router[method](route,verifyJWT,auth.isAdmin, controller);
    
    //C2
    // router[item.method](item.routeName, item.controller);
});

departmentController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route, controller);
})
campaignController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route, controller);
})
accountController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route, controller);
})
ideaController.forEach((item) =>{
    const { method, route, controller } = item;
    router[method](route, controller);
})
router.get('/admin',(req,res)=>{
    res.json('Hello admin')
})
module.exports = router;