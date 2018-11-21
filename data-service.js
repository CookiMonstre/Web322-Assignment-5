const Sequelize = require('sequelize');

var sequelize = newSequelize('d646dgbc7rkoq1', 'odyiuhdpibpcab', 'ac08c1307e864611a65023e3e860a8e5cd78baf08479dc5dda0823209747110a', {
    host: 'ec2-54-225-196-122.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
dialectOptions: {
ssl: true
    }
});

//define following 2 data models and their relationship employee & department
//employee 
var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, //Primary Key & Auto Increment 
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    hireDate: Sequelize.STRING,
});

//Department
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, //Primary Key & Auto Increment 
    departmentName: Sequelize.STRING,
});




module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
}

module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) {
        reject();
        });
        
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        reject();
        });
        

};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        reject();
        });
    };        


module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
};

module.exports.getDepartments = function(){
    return new Promise(function (resolve, reject) {
        reject();
        });
}

module.exports.updateEmployee = function(employeeData) {
    return new Promise(function (resolve, reject) {
        reject();
        });        
};