import inquirer from "inquirer";

let todos = [];
let condition = true;

while (condition) {
  let answer = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: "what do you want to add in your todos",
    },
    {
      name: "addMore",
      type: "confirm",
      message: "are you sure you want to add more ?",
      default: "false",
    },
  ]);
  todos.push(answer.todo);
  condition = answer.addMore;
  console.log(todos);
}

if (!condition) {
  const { deleteTask } = await inquirer.prompt({
    name: "deleteTask",
    type: "confirm",
    message: "Do you want to delete any tasks?",
    default: false,
  });

  if (deleteTask) {
    const { tasksToDelete } = await inquirer.prompt({
      name: "tasksToDelete",
      type: "checkbox",
      message: "Select tasks to delete:",
      choices: todos.map((todo, index) => ({
        name: `${index + 1}: ${todo}`,
        value: index,
      })),
      validate: (input) =>
        input.length > 0 ? true : "Please select at least one task to delete",
    });
  }
}
