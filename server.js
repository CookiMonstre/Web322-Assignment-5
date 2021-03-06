/*********************************************************************************
* WEB322 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jacob Van Halteren Student ID: 111769170 Date: November 25th 2018
*
* Online (Heroku) Link: Cannot Debug because cannot get it to run. Emailed you
*                       mid afternoon friday. Server gives an "undifined" error
*                       message, so it was literally impossible for me to debug
*                       So i spent 4 hrs attempting to remidy the issue and
*                       Nothing worked. Hense I have not put the app on Heroku
*                       As it does not run localy. I will be asking for help in
*                       wednsday lab. I have attempted to impliment everything else
*                       base on the word doc and sample website but it is near
*                       impossible when the site does not run local.
* PS: Error occured after updating data service to create the sequilize server
*     Conection and tables.
********************************************************************************/

const express = require("express");
const path = require("path");
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const app = express();
const exphbs = require('express-handlebars');

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise((res, req) => {
        data_service.initialize().then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err);
        });
    });
}

//USE app.engine
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
				navLink: function(url, options){
					return '<li' + 
					((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
					'><a href="' + url + '">' + options.fn(this) + '</a></li>';
				},
				equal: function (lvalue, rvalue, options) {
					if (arguments.length < 3)
							throw new Error("Handlebars Helper equal needs 2 parameters");
					if (lvalue != rvalue) {
							return options.inverse(this);
					} else {
							return options.fn(this);
					}
			}			
    }
}));
app.set("view engine", ".hbs");
//USE app.engine

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

app.use(function(req,res,next){
	let route = req.baseUrl + req.path;
	app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
	next();
});

app.get("/", (req,res) => {
    //res.sendFile(path.join(__dirname, "/views/home.html"));
		res.render("home");
});



app.get("/about", (req,res) => {
    //res.sendFile(path.join(__dirname, "/views/about.html"));
		res.render("about");
});

app.get("/images/add", (req,res) => {
    //res.sendFile(path.join(__dirname, "/views/addImage.html"));
		res.render("addImage");
});

app.get("/employees/add", (req,res) => {
    //res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
		res.render("addEmployee");
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err, items) {
			res.render("images", {images:items});
    });
});

app.get("/employees", (req, res) => {
    if (req.query.status) {
        data_service.getEmployeesByStatus(req.query.status).then((data) => {
            res.render("employees", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render({ message: "no results" });
                });
    } else if (req.query.department) {
        data_service.getEmployeesByDepartment(req.query.department).then((data) => {
            res.render("employees", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render({ message: "no results" });
                });
    } else if (req.query.manager) {
        data_service.getEmployeesByManager(req.query.manager).then((data) => {
            res.render("employees", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render({ message: "no results" });
                });
    } else {
        data_service.getAllEmployees().then((data) => {
            res.render("employees", { data: data, title: "Employees" });
        }).catch((err) => {
            res.render({ message: "no results" });
        });
    }
});

/*app.get("/employee/:empNum", (req, res) => {
    data.getEmployeeByNum(req.params.empNum).then((data) => {
			res.render("employee", { employee: data });
    }).catch((err) => {
			res.render("employee",{message:"no results"})
    });
});*/



app.get("/employee/:empNum", (req, res) => {

    // initialize an empty object to store the values
    let viewData = {};

    dataService.getEmployeeByNum(req.params.empNum).then((data) => {
        if (data) {
            viewData.employee = data; //store employee data in the "viewData" object as "employee"
        } else {
            viewData.employee = null; // set employee to null if none were returned
        }
    }).catch(() => {
        viewData.employee = null; // set employee to null if there was an error
    }).then(dataService.getDepartments).then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"

        // loop through viewData.departments and once we have found the departmentId that matches
        // the employee's "department" value, add a "selected" property to the matching 
        // viewData.departments object

        for (let i = 0; i<viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.employee.department) {
                viewData.departments[i].selected = true;
            }
        }

    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.employee == null) { // if no employee - return an error
            res.status(404).send("Employee Not Found");
        } else {
            res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    });
});


app.get("/departments", (req,res) => {
    data_service.getDepartments().then((data) => {
        res.render("departments", { data: data, title: "Departments" });
    }).catch((err) => {
        res.render({ message: "no results" });
    });
});


app.post("/employees/add", (req, res) => {
      data.getDepartments().then((data)=>{
       res.render("addEmployee",{departments: data});
      }).catch((err) => {
          res.render("addEmployee", {departments:[]});

        });
 
});

app.post("/images/add", upload.single("imageFile"), (req,res) =>{
    res.redirect("/images");
});

app.post("/employee/update", (req, res) => {
	data.updateEmployee(req.body).then(()=>{
	res.redirect("/employee");
	}).catch((err)=>{
        res.status(500).send("Unable to Update Employee");     
    });
});



app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });


/*
data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});*/

app.get("/departments/add", (req,res) => {
    //res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
		res.render("addDepartment");
});

app.post("/departments/add", (req, res) => {
    data.addDepartment(req.body).then(()=>{
      res.redirect("/departments");
    }).catch((err)=>{
        res.status(500).send("Unable to Update Employee");   
    });
});

  app.post("/department/update", (req, res) => {
	data.updateDepartment(req.body).then(()=>{
	res.redirect("/departments");
	}).catch((err)=>{
        res.status(500).send("Unable to Update Employee");
    });
});

app.get("/department/:departmentId", (req, res) => {
    data.getDepartmentByNum(req.params.departmentId).then((data) => {
		res.render("department", { department: data });
    }).catch((err) => {
        res.status(404).send("Department Not Found");
    });
});

app.get("/departments/delete/:departmentId", (req, res) => {
    data.deleteDepartmentById(req.params.id).then((data) => {
		res.render("departments", { department: data });
    }).catch((err) => {
        res.status(500).send("Unable to Remove Department / Department not found)");
    });
});
//Like above Function but for employees
app.get("/employees/delete/:empNum", (req, res) => {
    data.deleteEmployeeById(req.params.num).then((data) => {
		res.render("departments", { department: data });
    }).catch((err) => {
        res.status(500).send("Unable to Remove Department / Department not found)");
    });
});

app.post("/employees/add", (req, res) => {
    data_service.addEmployee(req.body).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
    });
});
