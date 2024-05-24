const inquirer = require('inquirer');

inquirer.prompt({
    type: 'input',
    name: 'test',
    message: 'This is a test',
}).then(answers => {
    console.log(answers);
});