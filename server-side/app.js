const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
const path= require('path');

// Body Parser Implement
app.use(bodyParser.json())
//if we test in console.log app.use(req => console.log(req.body))

//Security Middleware Declarations
const helmet = require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xssClean= require('xss-clean');
const rateLimit =require('express-rate-limit');
const hpp =require('hpp');
const cors =require('cors');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp())

// Request Rate Limit for user click per second
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Database Declaration and Configuration
const mongoose = require('mongoose');

const URI = "mongodb+srv://<username>:<password>@cluster0.yn9xgi5.mongodb.net/CRUD?retryWrites=true&w=majority";
const OPTIONS = { user: 'crud', pass: 'crud123', autoIndex: true };

mongoose.connect(URI, OPTIONS)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((error) => {
    console.error("Connection Error:", error);
  });



//serial 1:frontend to backend connection
app.use(express.static('../client-side/dist'));

//serial 2: API Routing end point Implement
app.use("/api/v1",router)

//serial 3: 404 route setup
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client-side", "dist", "index.html"));
});


module.exports=app;