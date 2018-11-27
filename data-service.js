const Sequelize = require('sequelize');

var sequelize = new Sequelize('d646dgbc7rkoq1', 'odyiuhdpibpcab', 'ac08c1307e864611a65023e3e860a8e5cd78baf08479dc5dda0823209747110a', {
    host: 'ec2-54-225-196-122.compute-1.amazonaws.com',
    dialect: 'postgres',
    //operatorsAliases: false, //File Would not start server, this removes a warning message but
                            //sadly did not start my file.
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.log('Unable to connect to the database:', err);
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

//Department.hasMany(Employee, {foreignKey: 'department'});



module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync()
        .then((Employee) => {
            resolve();
        }).then((Department) => {
            resolve();
        }).catch((err) => {
            reject("unable to sync the database");
        });
        reject();
    });   
};

module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll());
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.addEmployee = function (employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                isManager: employeeData.isManager,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate}));
            }).catch(() => {
                reject("unable to create employee.");
            });
        }).catch(() => {
            reject("unable to create employee.");
    });
}

module.exports.getEmployeeByNum = function (num) {
    return new Promise( function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeNum: num
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}


module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    status: status
                }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.getEmployeesByDepartment = function(department) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    department: department
            }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.getEmployeesByManager = function(manager) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeManagerNum: manager
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        reject();
        });
        
};

module.exports.getDepartments = function(){
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Department.findAll());
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.updateEmployee = function(employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.update({
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressPostal: employeeData.addressPostal,
                addressState: employeeData.addressPostal,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department
            }, { where: {
                employeeNum: employeeData.employeeNum
            }}));
        }).catch(() => {
            reject("unable to create employee.");
        });
    });
}

module.exports.addDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            for(let i in departmentData){
                if(departmentData[i] == "") {
                    departmentData[i] = null;
                }
            }
            Department.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }).then(() => {
                resolve(Department);
            }).catch((err) => {
                reject("unable to create department");
            });
        }).catch(() => {
            reject("unable to create department");
        });
    });
}

module.exports.updateDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            for(let i in departmentData){
                if(departmentData[i] == "") {
                    departmentData[i] = null;
                }
            }
            Department.update({
                departmentName: departmentData.departmentName
            }, { where: {
                departmentId: departmentData.departmentId
            }}).then(() =>{
                resolve(Department);
            }).catch((err) => {
                reject("unable to update department");
            });
        }).catch(() => {
            reject("unable to update department");
        });
    });
}

module.exports.getDepartmentById = function(id) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Department.findAll({
                where:{
                    departmentId: id
                }}));
        }).catch((err) => {
            reject("no results returned");
        });
    });
}

module.exports.deleteDepartmentById = function(id) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
                resolve(Department.destroy({
                    where:{
                        employeeNum: empNum
                    }}));
        }).catch((err) => {
            reject();
        });
    });
}
//Like department destory funct
module.exports.deleteEmployeeById = function(id) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
                resolve(Employee.destroy({
                    where:{
                        employeeNum: empNum
                    }}));
        }).catch((err) => {
            reject();
        });
    });
}