const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const setupRoutes = require("./app-routes");

const app = express();

const setupApp = async () => {
   dotenv.config();
   
   // connect db
   mongoose.set("strictQuery", false);
   await mongoose
   .connect(process.env.MONGO_URL)
   .then(() => {
      console.log("Connect successfully");
   })
   .catch((err) => {
      console.log(err);
   })

   //middleware

   //route
   setupRoutes(app);

   return app.listen(process.env.PORT || 8080);
}

setupApp();