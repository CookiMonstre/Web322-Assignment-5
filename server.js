/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jacob Van Halteren Student ID: 111769170 Date: October 21th 2018
*
* Online (Heroku) Link: https://stark-mountain-28920.herokuapp.com/
* - PLEASE NOTE
* - Get Employee, Manager, Departments and all sub functions such as
*   get employee by status work when deploying local host but throws
*   internal server error on heroku - After updating heroku
*   to include this message they work GREAT !! :)
* - ALSO i couldn't get get emplyee by num link to work
********************************************************************************/

const express = require("express");
const path = require("path");
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // tell multer to use the diskStorage function for naming files instead of the default.
  const upload = multer({ storage: storage });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/images/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.get("/employees/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err, items) {
        res.json({images:items});
    });
});

app.get("/employees", (req, res) => {
    if (req.query.status) {
        data.getEmployeesByStatus(req.query.status).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else if (req.query.department) {
        data.getEmployeesByDepartment(req.query.department).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else if (req.query.manager) {
        data.getEmployeesByManager(req.query.manager).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        data.getAllEmployees().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

app.get("/employee/:empNum", (req, res) => {
    data.getEmployeeByNum(req.params.empNum).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message:"no results"});
    });
});

app.get("/managers", (req,res) => {
    data.getManagers().then((data)=>{
        res.json(data);
    });
});

app.get("/departments", (req,res) => {
    data.getDepartments().then((data)=>{
        res.json(data);
    });
});


app.post("/employees/add", (req, res) => {
    data.addEmployee(req.body).then(()=>{
      res.redirect("/employees");
    });
  });

app.post("/images/add", upload.single("imageFile"), (req,res) =>{
    res.redirect("/images");
});


app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});
