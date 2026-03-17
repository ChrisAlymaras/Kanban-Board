let task1 = {
  name: "Workout",
  duration: "2H-0M",
  difficulty: 1,
  notes:"Bag,Shoes,Shorts,Glasses."
}
let task2 = {
  name: "Lunch",
  duration: "0H-30M",
  difficulty: 2,
  notes:"Have a small meal then a bigger one."
}
let task3 = {
  name: "Studying",
  duration: "3H-30M",
  difficulty: 4,
  notes:"Deliver Java project until the end of the month."
}
let task4 = {
  name: "Build New PC",
  duration: "5H",
  difficulty: 5,
  notes:"Be careful with the smaller case."
}
let task5 = {
  name: "Football Match",
  duration: "1H-20M",
  difficulty: 3,
  notes:"Show up 15minutes earlier."
}

let tasks = [task1,task2,task3,task4,task5];
//store tasks in local storage, maybe later on we pull data from there
localStorage.setItem("tasks", JSON.stringify(tasks));

//task column initialize
const column = document.getElementById("to-do");

//create card header-body-footer
for (let i=0; i<tasks.length; i++) {
    createCard(i);
}

function createCard(i){
  const taskCard = document.createElement("div");
  taskCard.classList.add("card-container");
  taskCard.draggable = true;

  const taskHeader = createHeader(i);
  const taskBody = createBody(i);
  const taskFooter = createFooter(i);


  taskCard.appendChild(taskHeader);
  taskCard.appendChild(taskBody);
  taskCard.appendChild(taskFooter);
  column.appendChild(taskCard);
}

function createHeader(index) {
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    const headerBtn = document.createElement("button");
    headerBtn.classList.add("task-button");
    headerBtn.addEventListener("click",()=>expandDetails(index));
    headerBtn.innerHTML = "Details";

    const header = document.createElement("h2");
    header.innerHTML = tasks[index].name;

    taskHeader.appendChild(header);
    taskHeader.appendChild(headerBtn);

    return taskHeader;
}

function createBody(index) {
    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");

    const taskDuration = document.createElement("span");
    taskDuration.innerHTML = tasks[index].duration;

    //set difficulty and transform its number into stars
    const taskDifficulty = createStars(index);

    taskBody.appendChild(taskDuration);
    taskBody.appendChild(taskDifficulty);
    return taskBody;
}

function createStars(index){
    const taskDifficulty = document.createElement("div");
    taskDifficulty.innerHTML = "Difficulty: ";
    for(let i=0; i<5; i++) {
        const star = document.createElement("span");
        star.classList.add("fa");
        star.classList.add("fa-star");
        if (i < tasks[index].difficulty) {
            star.classList.add("checked")
        }
        taskDifficulty.appendChild(star);
    }
    return taskDifficulty;
}

function createFooter(index) {
    const taskFooter = document.createElement("div");
    taskFooter.classList.add("task-footer");

    const taskNotes = document.createElement("small");
    taskNotes.innerHTML = `Notes: ${tasks[index].notes}`;
    taskFooter.appendChild(taskNotes);
    return taskFooter;
}

//build info container to show details of selected task
const showDetails = document.querySelector(".info-container");

function expandDetails(i){
  clearDetails();
  //set up body for showing task details
    const detailsHeader = document.createElement("div");
    detailsHeader.classList.add("details-header");

    //task title
    const header = document.createElement("span");
  header.innerHTML = tasks[i].name;
  detailsHeader.appendChild(header);

  //duration with clock icon
  const durationContainer = document.createElement("div");
  durationContainer.classList.add("duration-header");
  const clockIcon = document.createElement("i");
  clockIcon.classList.add("fa");
  clockIcon.classList.add("fa-clock-o");
  clockIcon.innerHTML = ` ${tasks[i].duration}`;
    detailsHeader.appendChild(clockIcon);

    //difficulty
    const taskDifficulty = createStars(i);
    detailsHeader.appendChild(taskDifficulty);

    //notes
  const notes = document.createElement("p");
  notes.innerHTML = `Notes : ${tasks[i].notes}`;

  //create an input for extra notes
    const form = document.createElement("form");
    form.classList.add("notes-form");
    form.addEventListener("submit", (event) => saveNotes(event,i));

    const input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("id","newNotes");
  input.setAttribute("name","newNotes");
  const button  = document.createElement("button");
  button.setAttribute("type","submit");
  button.innerHTML = "Save";
  //append input and button
  form.appendChild(input);
  form.appendChild(button);

  //append to info-container
  showDetails.appendChild(detailsHeader);
  showDetails.appendChild(notes);
  showDetails.appendChild(form);
}

//when a task is expanded and user enters new details, store them
function saveNotes(event,i){
    event.preventDefault();
    const data = new FormData(event.target);

    const newNote = data.get("newNotes");
    if (newNote.trim()) {
        tasks[i].notes += " " + newNote+".";
    }
    event.target.reset();
}

//clear details so as not to have conflicts with the next task called
function clearDetails(){
  showDetails.innerHTML = "";
}

//handle submit when a new task is added
const taskForm = document.querySelector(".task-form");
taskForm.addEventListener("submit",(event)=>handleSubmit(event));

function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const title = data.get("title");
    const hours = data.get("hours");
    const minutes = data.get("minutes");
    const difficulty = data.get("difficulty");
    const notes = data.get("notes");

    const newTask = {
        "name": title,
        "duration": `${hours}H-${minutes}M`,
        "difficulty": difficulty,
        "notes": notes
    }
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    //create new task and append to to-do column
    createCard(tasks.length-1);
    updateChanges();
}

//set listener for the collapsible form when entering new task
const newTaskBtn = document.querySelector(".collapsible");
newTaskBtn.addEventListener("click", function() {
    const content = this.nextElementSibling;
    if (content.style.display === "none"){
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
});

function updateChanges(){
    document.querySelectorAll(".card-container").forEach(setEveryElement);
    document.querySelectorAll(".dropzone").forEach(setEveryZone);
    taskForm.clear();
}

//set up event listeners for drag and drop functionality
let dragged;

//select items and zones
document.querySelectorAll(".card-container").forEach(setEveryElement);
document.querySelectorAll(".dropzone").forEach(setEveryZone);

function setEveryElement(item) {
  item.addEventListener("drag",onDrag);
}

//actions triggered when start dragging
function onDrag(event){
  dragged = event.target;
  event.target.classList.add("dragging");
  dragged.addEventListener("dragstart", letDrop);
  //console.log(dragged);
}

//actions triggered when stop dragging
function letDrop(event){
  event.target.addEventListener("dragend", ()=>{
    event.target.classList.remove("dragging");
    //console.log(event.target);
  });
}

//add listeners for drop-zones

//prevent default for let dropping
function setEveryZone(zone){
  zone.addEventListener("dragover",(event)=>{
    event.preventDefault();
  })
  onDragging(zone);
}

//actions triggered when entering a zone
function onDragging(zone){
  zone.addEventListener("dragenter",(event)=>{
    if(event.target.classList.contains("dropzone")){
      event.target.classList.add("dragover");
    }
  })
  onLeaving(zone);
}

//actions when button-up
function onLeaving(zone){
  zone.addEventListener("dragleave",(event)=>{
    if(event.target.classList.contains("dropzone")){
      event.target.classList.remove("dragover");
    }
  })
  addItem(zone);
}

//actions when dropping
function addItem(zone){
  zone.addEventListener("drop", (event)=>{
    event.preventDefault();
    //console.log(event.target);
    event.target.appendChild(dragged);
  })
}



