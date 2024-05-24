const { mainMenu } = require('./inquirer');

async function run() {
  try {
    await mainMenu();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();