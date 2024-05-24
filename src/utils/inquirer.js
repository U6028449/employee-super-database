// Import the required modules
const inquirer = require('inquirer');
const queries = require('../queries/queries');

// Function to display the main menu and handle user choices
function mainMenu() {
    // Prompt the user to choose an action
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }).then((response ) => {
        // Handle the user's choice
        switch (response.choice) {
            // If the user wants to view all departments
            case 'View all departments':
                // Query the database for all departments and display them
                queries.getDepartments().then(departments => {
                    console.table(departments);
                    // Return to the main menu
                    mainMenu();
                }).catch(error => console.error(error));
                break;
            // Similar comments apply for the other cases
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
                // Prompt the user for the name of the new department
                inquirer.prompt({
                    name: 'departmentName',
                    type: 'input',
                    message: 'What is the name of the department?'
                }).then(({ departmentName }) => {
                    // Add the new department to the database
                    queries.addDepartment(departmentName).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                }).catch(error => console.error(error));
                break;
            // Similar comments apply for the other cases
            case 'Add a role':
                // Prompt the user for the details of the new role
                inquirer.prompt([
                    // ...
                ]).then(({ title, salary, department_id }) => {
                    queries.addRole(title, salary, department_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));   
                });
                break;
            case 'Add an employee':
                // Prompt the user for the details of the new employee
                inquirer.prompt([
                    // ...
                ]).then(({ first_name, last_name, role_id, manager_id }) => {
                    queries.addEmployee(first_name, last_name, role_id, manager_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                });
                break;
            case 'Update an employee role':
                // Prompt the user for the employee's ID and the new role ID
                inquirer.prompt([
                    // ...
                ]).then(({ employee_id, new_role_id }) => {
                    queries.updateEmployeeRole(employee_id, new_role_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                });
                break;
            case 'Exit':
                // Exit the application
                console.log('Goodbye!');
                process.exit(0);
        }
    });
    console.log('here');
}

// Export the mainMenu function
module.exports = { mainMenu };