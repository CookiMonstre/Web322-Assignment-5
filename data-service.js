const fs = require('fs');

var employees = [];
var departments = [];

module.exports.initialize=function(){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
    fs.readFile("./data/employees.json", 'utf8',(err, data) => {
        if(err) 
            reject("can't read employees");
        employees = JSON.parse(data);
            fs.readFile("./data/departments.json", 'utf8',(err, data) => {
                if(err) 
                    reject("can't read departments");
                departments = JSON.parse(data);

                resolve();   
            });
        });    
    });     
};

module.exports.getAllEmployees=function(){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employees.length == 0){
                reject("no employees");
            }else{
                resolve(employees);
            } 
    });   
};

module.exports.getManagers=function(){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        if(employees.length == 0){
            reject("no employees");
        }else{
            var myArray = [];
            for (i = 0; i < employees.length; i++){
                if(employees[i].isManager = true){
                    myArray.push(employees[i]);
                }
            }
            resolve(myArray);
        };   
    });   
};

module.exports.getDepartments=function(){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(departments.length == 0){
                reject("no departments");
            }else{
                resolve(departments);
            }            
    });  
};

//add employee
module.exports.addEmployee=function(employeeData){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employeeData.isManager = undefined){
                employeeData.isManager = false;
            }
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve;         
    });  
};

module.exports.getEmployeesByStatus=function(status){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employees.length == 0){
                reject("no employees");
            }else{
                stuff = []
                var i
                for(i = 0; i < employees.length; i++){
                    if(employees[i].status = status){
                        stuff.push(employees[i])
                    }
                }
                resolve(stuff);
            } 
    });   
};

module.exports.getEmployeesByDepartment=function(department){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employees.length == 0){
                reject("no employees");
            }else{
                stuff = []
                var i
                for(i = 0; i < employees.length; i++){
                    if(employees[i].department = department){
                        stuff.push(employees[i])
                    }
                }
                resolve(stuff);
            } 
    });   
};

module.exports.getEmployeesByManager=function(manager){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employees.length == 0){
                reject("no employees");
            }else{
                stuff = []
                var i
                for(i = 0; i < employees.length; i++){
                    if(employees[i].employeeManagerNum = manager){
                        stuff.push(employees[i])
                    }
                }
                resolve(stuff);
            } 
    });   
};

module.exports.getEmployeeByNum=function(num){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
            if(employees.length == 0){
                reject("no employees");
            }else{
                stuff = []
                var i
                for(i = 0; i < employees.length; i++){
                    if(employees[i].employeeNum = num){
                        stuff.push(employees[i])
                    }
                }
                resolve(stuff);
            } 
    });   
};