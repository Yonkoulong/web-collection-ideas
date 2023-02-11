const express = require("express");
const mongoose = require("mongoose");
const setupRoutes = require("./app-routes");
const session = require('express-session');

const app = express();

const setupApp = async () => {

   //connect db
   await mongoose
   .connect(process.env.MONGO_URL)
   .then(() => {
      console.log("Connect successfully");
   })
   .catch((err) => {
      console.log(err);
   })

   //middleware
   app.use(session({
      secret: '2C44-4D44-WppQ38S',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 }
   }));
   // app.use(bodyParser.urlencoded({ extended: true }));

   //route
   setupRoutes(app);

   return app.listen(process.env.PORT || 8080);
}

setupApp();