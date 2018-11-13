const fs = require("fs");

let employees = [];
let departments = [];


module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/departments.json', (err, data) => {
            if (err) {
                reject(err);
            }

            departments = JSON.parse(data);

            fs.readFile('./data/employees.json', (err, data) => {
                if (err) {
                    reject(err);
                }

                employees = JSON.parse(data);
                resolve();
            });
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        if (employees.length == 0) {
            reject("query returned 0 results");
        }
        resolve(employees);
    })
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;
        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);

        resolve();
    });

};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundEmployee = null;

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                foundEmployee = employees[i];
            }
        }

        if (!foundEmployee) {
            reject("query returned 0 results");
        }

        resolve(foundEmployee);
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {

        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};


module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].isManager == true) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getDepartments = function(){
   return new Promise((resolve,reject)=>{
    if (departments.length == 0) {
        reject("query returned 0 results");
    }
    resolve(departments);
   });


}

module.exports.updateEmployee = function(employeeData) {
    return new Promise(function (resolve, reject) {
        if (employeeData.length == 0) {
            reject("query returned 0 results");
        }
        var tmpSpot = filteredEmployeees.employeeNum.find(employeeData.employeeNum);
        filteredEmployeees[tmpSpot] = employeeData;
        resolve();
    });
};