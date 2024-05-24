const inquirer = require('inquirer');
const queries = require('../queries/queries');

function mainMenu() {
     inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }).then((response ) => {
        
        switch (response.choice) {
            case 'View all departments':
                queries.getDepartments().then(departments => {
                    console.table(departments);
                    mainMenu();
                }).catch(error => console.error(error));
                break;
            case 'View all roles':
                queries.getRoles().then(roles => {
                    console.table(roles);
                    mainMenu();
                }).catch(error => console.error(error));
                break;
            case 'View all employees':
                queries.getEmployees().then(employees => {
                    console.table(employees);
                    mainMenu();
                }).catch(error => console.error(error));   
                break;
            case 'Add a department':
                inquirer.prompt({
                    name: 'departmentName',
                    type: 'input',
                    message: 'What is the name of the department?'
                }).then(({ departmentName }) => {
                    queries.addDepartment(departmentName).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                }).catch(error => console.error(error));
                break;
            case 'Add a role':
                inquirer.prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'What is the title of the role?'
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of the role?'
                    },
                    {
                        name: 'department_id',
                        type: 'input',
                        message: 'What is the department id of the role?'
                    }
                ]).then(({ title, salary, department_id }) => {
                    queries.addRole(title, salary, department_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));   
                });
                break;
            case 'Add an employee':
                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the first name of the employee?'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the last name of the employee?'
                    },
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'What is the role id of the employee?'
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: 'What is the manager id of the employee?'
                    }
                ]).then(({ first_name, last_name, role_id, manager_id }) => {
                    queries.addEmployee(first_name, last_name, role_id, manager_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                });
                break;
            case 'Update an employee role':
                inquirer.prompt([
                    {
                        name: 'employee_id',
                        type: 'input',
                        message: 'What is the id of the employee?'
                    },
                    {
                        name: 'new_role_id',
                        type: 'input',
                        message: 'What is the new role id for the employee?'
                    }
                ]).then(({ employee_id, new_role_id }) => {
                    queries.updateEmployeeRole(employee_id, new_role_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                });
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
        }
    });
    console.log('here');
}

 module.exports = { mainMenu };