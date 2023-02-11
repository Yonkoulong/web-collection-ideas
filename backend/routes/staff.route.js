const express = require("express");
const router = express.Router();

const useController = require("../controllers/staff.controller");

//useController is exported as array, so we have to loop it.
//forEach is method loop of javascript 
useController.forEach((item) => {
    //next, each item is element of useController or called a method which can handle a things
    //i use descstructuring declare from javascript ES6
    const { method, route, controller } = item;
    router[method](route, controller);
    
    //C2
    // router[item.method](item.routeName, item.controller);
});

module.exports = router;