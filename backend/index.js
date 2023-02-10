const express = require("express");
const mongoose = require("mongoose");

const app = express();

const setupApp = async () => {

    //connect db
    //middleware
    //route

    return app.listen(process.env.PORT || 8080);
}

setupApp();