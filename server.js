/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jacob Van Halteren Student ID: 111769170 Date: ________________
*
* Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/

var express = require("express");
var path = require("path");
var data = require("./data-service")
var app = express();
app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname,"/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees", function(req,res){
  res.send("TODO: get all employees");
});

app.get("/managers", function(req,res){
  res.send("TODO: get all employees who have isManager==true");
});

app.get("/departments", function(req,res){
  res.send("TODO: get all employees who have department==true");
});

app.use(function(req,res){
  res.send('ERROR #404 Page Not Found');
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);