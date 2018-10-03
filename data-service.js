const fs = require('fs');

var employees = [];
var departments = [];
var fs = require('fs');
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