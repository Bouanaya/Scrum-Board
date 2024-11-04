// Récupération des éléments du DOM
const forms = document.getElementById("demo-form")
const submitBtn = document.querySelector("#submitBtn")
const ubdatebtn = document.querySelector("#ubdatebtn")
const btn = document.getElementById("btn")
const parent = document.querySelector(".parent")
const parent1 = document.querySelector(".parent1")
const parent2 = document.querySelector(".parent2")
const titleList = document.getElementById('title');
const radios = document.querySelectorAll('input[name="flexRadioDefault"]');
const drag = document.querySelectorAll('.drag');
const Priority = document.getElementById("select1")
const Priority1 = document.getElementById("select2")
const dateTask = document.getElementById("date")
const description = document.getElementById("description")
const mySpan = document.querySelector("#to-do-tasks-count")
let count = 0
let currentTaskId;

// Fonction pour rafraîchir l'affichage des tâches
const btnOpen = document.getElementById("show");
let show = 0;

const openModel = () => {
  if (show === 0) {
    btnOpen.style.display = "block"
    show = 1
  } else {
    btnOpen.style.display = "none"
    show = 0
  }
}

// Tableau pour stocker les tâches
let tasks = [];

// Fonction pour ajouter une nouvelle tâche
const addTask = () => {

  const task = {
    id: Date.now().toString(),
    text: titleList.value,
    date: dateTask.value,
    description: description.value,
    radios: Array.from(radios).find(radio => radio.checked).value,
    Priority: Priority.value,
    Priority1: Priority1.value
  };
  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();

  // SweetAlert pour confirmer l'ajout
  Swal.fire({
    title: 'Task Added!',
    text: `You have added a new task: "${task.text}"`,
    icon: 'success',
    confirmButtonText: 'Nice!'
  });
}

const renderTasks = () => {
  parent.innerHTML = ''; // Clear previous tasks
  tasks.forEach(task => {
    const btn = document.createElement('div');
    btn.dataset.id = task.id;
    btn.className = "d-flex p-3 border-top border-primary border-0 btnid   ";
    
    btn.innerHTML = `
      <div class="pe-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill text-success" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
        </svg>
      </div>
      <div>
        <div class="text-start fs-5 fw-bold text-break ">${task.text}</div>
        <div>
          <div class="text-start text-secondary">#1 created on ${task.date}</div>
          <div class="text-start text-break white-space">${task.description}</div>
        </div>
        <div>
      
        <div class="text-start mt-2 text-white ">
          <span class="text-black">type :</span>
        
          <span class=" bg-succes btn-sm me-1">${task.radios}</span>
        
        </div>
        
        <div class="text-start mt-3 text-white ">
          <span class="text-black">proprety  :</span>
          <span class="bg-succes btn-sm me-1">${task.Priority}</span>
        </div>
          <div class="text-start mt-3 text-white">
          <span class="text-black">status :</span>
          <span class="bg-succes btn-sm me-1">${task.Priority1}</span>
        </div>
        </div>
         
      
        <div class="text-start mt-4">
          <button data-id="${task.id}" class="btn btn-primary btn-sm update">Update</button>
          <button data-id="${task.id}" class="btn btn-danger btn-sm me-1 delete">Delete</button>
        </div>
      </div>
    `;
    parent.appendChild(btn);
  });
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addTask()
  openModel()
  forms.reset()
  mySpan.textContent = tasks.length;
});


function deleteTask(taskId) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks = tasks.filter(e => e.id !== taskId);
      saveTasksToLocalStorage();
      renderTasks();
      mySpan.textContent = tasks.length;
      Swal.fire(
        'Deleted!', 
        'Your task has been deleted.',
        'success'
      );
    }
  });
}
const populateFormForUpdate = (task) => {
  titleList.value = task.text;
  dateTask.value = task.date;
  description.value = task.description;
  Array.from(radios).find(radio => radio.value === task.radios).checked = true;
  Priority.value =task.Priority;
  Priority1.value = task.Priority1;
};

parent.addEventListener("click", (e) => {

  const target = e.target;
  if (target.classList.contains('update')) {
    const taskId = target.dataset.id;
    currentTaskId = taskId;
    const task = tasks.find(task => task.id === taskId);
    populateFormForUpdate(task);
    openModel();
  } else if (target.classList.contains('delete')) {
    const taskId = target.dataset.id;
    deleteTask(taskId)
  }
});


const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
};

// Save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

ubdatebtn.addEventListener("click", (e)=>{
  e.preventDefault()
  updateTask()

  
  
})
const updateTask = () => {
  const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
  if (taskIndex > -1) {
    tasks[taskIndex].text = titleList.value;
    tasks[taskIndex].date = dateTask.value;
    tasks[taskIndex].description = description.value;
    tasks[taskIndex].radios = Array.from(radios).find(radio => radio.checked).value;
    tasks[taskIndex].Priority = Priority.value;
    tasks[taskIndex].Priority1 = Priority1.value;

    saveTasksToLocalStorage();
    renderTasks();
    openModel()

    Swal.fire({
      title: 'Task Updated!',
      text: `You have updated the task: "${tasks[taskIndex].text}"`,
      icon: 'success',
      confirmButtonText: 'Nice!'
    });

    currentTaskId = null; // Reset currentTaskId after update

    
  }
}


drag.forEach((e )=> { e.addEventListener("dragstart",()=>{
  // e.classList.add('dragging')
  console.log("hhhhhhhhhhh");
  
})
})

const removeall =()=>{
  console.log("hhhh");
  
  tasks = tasks.value = []
  renderTasks()
  console.log(tasks);
  
}
 

 
 