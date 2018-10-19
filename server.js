/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jacob Van Halteren Student ID: 111769170 Date: October 10th 2018
*
* Online (Heroku) Link: _____
*
********************************************************************************/
const fs = require('fs');
var express = require("express");
var path = require("path");
var data = require("./data-service.js")
var multer = require("multer")
var app = express();
app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

//Middle Where

const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//Upload Variable
const upload = multer({ storage: storage });

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

//Upload route
app.post("/images/add", upload.single("imageFile"), (req, res) => {
  res.send("/images");
});

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname,"/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees/add", function(req,res){
  res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

app.get("/images/add", function(req,res){
  res.sendFile(path.join(__dirname,"/views/addImage.html"));
});

//Get images
app.get("/images", function(req,res){
  res.json("images");
});

app.get("/employees", function(req,res){
	data.getAllEmployees()
	.then(function(data){
		res.json(data);
	})
	.catch(function(reason){
    res.send("images");
	});
});

app.get("/managers", function(req,res){
	data.getManagers()
	.then(function(data){
    res.json(data);
	})
	.catch(function(reason){
    res.send(reason);
	});
});

app.get("/departments", function(req,res){
	data.getDepartments()
	.then(function(data){
    		res.json(data);
	})
	.catch(function(reason){
        res.send(reason);
	});
});

app.use(function(req,res){
  res.send('ERROR #404 Page Not Found');
});

// setup http server to listen on HTTP_PORT
data.initialize()
.then(function(){
  app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(reason){
  console.log(reason);
});
