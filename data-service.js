var employees = [];
var departments = [];

var initialize = new function(){
    var fs = require('fs');
    employees = fs.readFileSync("./data/employees.json").toString().split("\n");
};