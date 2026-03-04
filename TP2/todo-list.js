const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every todo
    todoList.forEach((todoObject, index) => {
      const { name, dueDate } = todoObject;

      const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-button">
          Delete
        </button>
      `;

      todoListHTML += html;
    });

    // Display inside the div
    document.querySelector('.js-todo-list')
      .innerHTML = todoListHTML;

    // Add event listener to every delete button
    document.querySelectorAll('.js-delete-button')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1); // remove task
          renderTodoList(); // rerender list
        });
      });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add new task to array
  todoList.push({
    name: name,
    dueDate: dueDate
  });

  // Clear input
  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}