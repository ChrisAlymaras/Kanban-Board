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
localStorage.setItem("tasks", JSON.stringify(tasks));

//task column initialize
let column = document.getElementById("to-do");

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

function createHeader(index) {
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    const headerBtn = document.createElement("button");
    headerBtn.classList.add("task-button");
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

const showDetails = document.querySelector(".info-container");
const allButtons = document.querySelectorAll(".task-button");

for (let i=0; i<allButtons.length; i++) {
  allButtons[i].addEventListener("click",()=>expandDetails(i));
}

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

function saveNotes(event,i){
    event.preventDefault();
    const data = new FormData(event.target);

    const newNote = data.get("newNotes");
    if (newNote.trim()) {
        tasks[i].notes += " " + newNote+".";
    }
    event.target.reset();
}

//clear details in order to show another
function clearDetails(){
  showDetails.innerHTML = "";
}

//handle submit when a new task is added
const taskForm = document.querySelector(".task-form");
taskForm.addEventListener("submit",()=>handleSubmit);

function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const title = data.title;
    const hours = data.hours;
    const minutes = data.minutes;
    const difficulty = data.difficulty;
    const notes = data.notes;

    const newTask = {
        "name": title,
        "duration": `${hours}H-${minutes}M`,
        "difficulty": difficulty,
        "notes": notes
    }
    tasks.push(newTask);
    createCard(tasks.length-1);
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

//drag and drop one thing !!

// source.addEventListener("drag",(event)=>{
//   console.log("dragging");
// });
//
// //when start dragging append "dragging" class and log it
// source.addEventListener("dragstart",(event)=>{
//   dragged=event.target;
//   console.log(dragged);
//   event.target.classList.add("dragging");
// });
//
// //when leave element, exclude class "dragging"
// source.addEventListener("dragend",(event)=>{
//   //reset the transparency
//   event.target.classList.remove("dragging");
// });
//
//add listeners for destination zone
// let target = document.querySelector(".dropzone");
//
// //make container/target open for a drop
// target.addEventListener("dragover",(event)=>{
//   //prevent default to allow item drop
//   event.preventDefault();
// });


// target.addEventListener("dragenter",(event)=>{
//   if(event.target.classList.contains("dropzone")){
//     event.target.classList.add("dragover");
//     console.log(target);
//   }
// });
//
// target.addEventListener("dragleave",(event)=>{
//   if(event.target.classList.contains("dropzone")){
//     event.target.classList.remove("dragover");
//   }
// })
//
//
// //append child to proper container
// target.addEventListener("drop",(event)=>{
//   event.preventDefault();
//   if (event.target.classList.contains("dropzone")){
//     event.target.classList.remove("dragover");
//     event.target.appendChild(dragged);
//   }
// });



