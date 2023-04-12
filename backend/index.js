const express = require("express");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const setupRoutes = require("./app-routes");
const fileUpload = require("express-fileupload");

// const whitelist = ['http://localhost:5173', 'http://localhost:8080']
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error())
//     }
//   },
//   credentials: true,
// }

const app = express();
app.use(fileUpload({
   useTempFiles:true,
   limits:{fileSize:50*2024*1024}
}))
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(bodyParser.json())
app.use(cors({credentials: true, origin: process.env.NODE_ENV === "dev" ? "http://localhost:5173" : "https://frontend-collection-ideas.onrender.com"}));

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