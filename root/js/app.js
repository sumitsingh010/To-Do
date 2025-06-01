// Selectors

let todoBtn = document.getElementById('todo-btn');
let todoTxt = document.querySelector('#todo-txt');
let todoCheck = document.querySelector('#check');
let todoBox = document.querySelector('.todo-box');
let todoAlert = document.querySelector('[data-alert]');
let todoContainer = document.querySelector('.todo-container');
const STORAGE_KEY = 'todo.list';
const STORAGE_KEY_ID = 'todo.listId';
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let completedTask = localStorage.getItem(STORAGE_KEY_ID);

// Functions

todoCheck.addEventListener('click', () => todoCheck.classList.toggle('checked'));
document.addEventListener('DOMContentLoaded', getStorage);
todoCheck.addEventListener('click', filterTasks);

window.onload = function () {
      todoTxt.focus();
}

todoBtn.onclick = function (e) {
      e.preventDefault();

      if (todoTxt.value.trim() === "") return;

      else {

      // let newAlert = document.querySelector('[data-alert]');

      // if (document.body.contains(newAlert)) {
      //       newAlert.remove();
      // }

      todoAlert.remove();
            
      let todoTaskContainer = document.createElement('div');

      todoContainer.insertAdjacentElement('beforeend', todoTaskContainer);

      todoTaskContainer.className = "todo-task-container";

      let todoCompleted = document.createElement('button');

      todoCompleted.className = "todo-completed";

      let todoCompletedIcon = document.createElement('i');

      todoCompletedIcon.className = "fas";
      
      todoCompletedIcon.classList.add("fa-check");

      todoCompleted.appendChild(todoCompletedIcon);

      let todoTask = document.createElement('p');

      todoTask.className = "todo-task";

      let todoTaskTxt = document.createTextNode(todoTxt.value);

      todoTask.append(todoTaskTxt);

      createList(todoTxt.value);

      let todo = createList(todoTxt.value);

      todos.push(todo);

      saveAndShow()

      let todoDelete = document.createElement('button');

      todoDelete.className = "todo-delete";

      todoDelete.innerHTML = `<i class="fas fa-trash"></i>`;

      todoTaskContainer.appendChild(todoCompleted);
      todoTaskContainer.appendChild(todoTask);
      todoTaskContainer.appendChild(todoDelete);

      todoTxt.value = null;

      todoTxt.focus();
      }

};

document.addEventListener('click', e => {
      item = e.target;

      if (item.className === "todo-delete") {
            item.parentElement.classList.add('drop');
            deleteSound.currentTime = 0;
            deleteSound.play();
            removeStorage(item);
            item.parentElement.addEventListener("transitionend", function() {
                  item.parentElement.remove();
                  if (todoContainer.childElementCount == 0) {
                        showAlert();
                  }
            })
      }
      if (item.className === "todo-completed") {
            item.nextSibling.classList.toggle('completed');
            completeSound.currentTime = 0;
            completeSound.play();
            launchConfetti();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      }
});

function filterTasks(e) {
      let todoTasks = document.querySelectorAll('section div');
      todoTasks.forEach(todo => {
            if (e.target.classList.contains('checked')) {
                  if (todo.children[1].classList.contains('completed')) {
                        todo.style.display = 'block';
                  } else {
                        todo.style.display = 'none';
                  }
            } else if (!e.target.classList.contains('checked')) {
                  if (todo.children[1].classList.contains('completed')) {
                        todo.style.display = 'none';
                  } else {
                        todo.style.display = 'block';
                  }
            }
      });
}

function showAlert() {
      let newAlert = todoAlert.cloneNode(true);
      newAlert.className = "alert";
      todoBox.insertBefore(newAlert, todoContainer);
}

function saveAndShow() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      localStorage.setItem(STORAGE_KEY_ID, completedTask);
};

function getStorage() {
      todos.forEach(item => {
            todoContainer.innerHTML +=
            `
            <div class="todo-task-container">
            <button class="todo-completed" id="todo-completed">
                  <i class="fas fa-check"></i>
            </button>
            <p class="todo-task" data-todo-id="${item.id}">${item.name}</p>
            <button class="todo-delete" id="todo-delete">
                  <i class="fas fa-trash"></i>
            </button>
            </div>
            `
            }
      )
}

function removeStorage(todo) {
      let todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createList(taskName) {
      return {id: Date.now().toString(),name: taskName};
}

// Trendy & Unique Theme: Add subtle animations, confetti, and sound feedback

// Add sound feedback for actions
const completeSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7e.mp3');
const deleteSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7e.mp3');

// Confetti effect for completed tasks
function launchConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('span');
        dot.className = 'confetti-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
        dot.style.animationDelay = `${Math.random()}s`;
        confetti.appendChild(dot);
    }
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1200);
}

// Add confetti CSS (injects once)
if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.innerHTML = `
    .confetti {
        pointer-events: none;
        position: fixed;
        left: 0; top: 0; width: 100vw; height: 100vh;
        z-index: 9999;
        overflow: hidden;
    }
    .confetti-dot {
        position: absolute;
        top: 0;
        width: 12px; height: 12px;
        border-radius: 50%;
        opacity: 0.8;
        animation: confetti-fall 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
    }
    @keyframes confetti-fall {
        to {
            transform: translateY(80vh) scale(0.7) rotate(360deg);
            opacity: 0;
        }
    }
    `;
    document.head.appendChild(style);
}

!function () {
      if (document.body.contains(document.querySelector('.todo-task-container'))) {
            todoAlert.remove();
      }
}();