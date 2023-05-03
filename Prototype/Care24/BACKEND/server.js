const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); // React Package for Frontend to deal with Backend.
const pdf = require('html-pdf');
const dotenv = require("dotenv");
require("dotenv").config();
//const puppeteer = require('puppeteer');

//const multer = require("multer")

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({
    storage: storage
  }).single("file");*/
  

//import routes
const MedicineRequestRoutes = require("./routes/MedicineDeliveryManagement/MedicineRequests");
const DeliveryStageRoute = require("./routes/MedicineDeliveryManagement/DeliveryProcess");

//const FileUpRoute = require("./routes/NewMediReqwithFile");

const pdfRoute = require("./routes/MedicineDeliveryManagement/PDFReport");

//app middleware
app.use(bodyParser.json());
//app.use(cors());
//  POST http://localhost:4500/newmedicinerequestWithFile/create net::ERR_FAILED 413 (Payload Too Large)
app.use(cors({
    origin: "http://localhost:3000",
  }));
  

//route middleware
app.use(MedicineRequestRoutes);
app.use(DeliveryStageRoute);

//app.use(FileUpRoute);

app.use(pdfRoute);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_Connection)
.then(()=>{
    console.log("Mongoose connected.");
    app.listen(PORT, ()=> {
        console.log(`Server is Running on Port ${PORT}`);
    });
});
const connection = mongoose.connection;