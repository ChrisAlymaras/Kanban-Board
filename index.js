let task1 = {
  name: "Workout",
  duration: "2h-0min",
  difficulty: 1,
  notes:"Bag,Shoes,Shorts,Glasses"
}
let task2 = {
  name: "Lunch",
  duration: "0h-30min",
  difficulty: 1,
  notes:""
}
let task3 = {
  name: "Studying",
  duration: "3h-30min",
  difficulty: 4,
  notes:"Deliver Java project until the end of the month"
}
let task4 = {
  name: "Build New PC",
  duration: "5h",
  difficulty: 5,
  notes:"Be careful with the smaller case"
}
let task5 = {
  name: "Football Match",
  duration: "1h-20min",
  difficulty: 1,
  notes:"Show up 15minutes earlier"
}

let tasks = [task1,task2,task3,task4,task5];

//task column initialize
let column = document.getElementById("to-do");

//create a div consisting of the task name and a button
for (let i=0; i<tasks.length; i++){

  //set task name and classes
  const task = document.createElement("div");
  task.innerHTML = tasks[i].name;
  task.classList.add("item");
  task.draggable = true;

  //set button for every task
  const btn = document.createElement("button");
  btn.classList.add("task-button");
  btn.innerHTML = "Details";

  //append button to div
  task.appendChild(btn);
  //append whole div to-do container
  column.appendChild(task);
}

const showDetails = document.querySelector(".info-container");
const allButtons = document.querySelectorAll(".task-button");

for (let i=0; i<allButtons.length; i++) {
  allButtons[i].addEventListener("click",()=>expandDetails(i));
}

function expandDetails(i){
  clearDetails();
  //set up body for showing task details
  const header = document.createElement("h1");
  header.innerHTML = tasks[i].name;

  const duration = document.createElement("h2");
  duration.innerHTML = `Duration : ${tasks[i].duration}`;

  const difficulty = document.createElement("h3");
  difficulty.innerHTML = `Difficulty : ${tasks[i].difficulty}`;

  const notes = document.createElement("h4");
  notes.innerHTML = `Notes : ${tasks[i].notes}`;

  //append to info-container
  showDetails.appendChild(header);
  showDetails.appendChild(duration);
  showDetails.appendChild(difficulty);
  showDetails.appendChild(notes);
}

//clear details in order to show another
function clearDetails(){
  showDetails.innerHTML = "";
}

//set up event listeners for drag and drop functionality
let dragged;

//select items and zones
document.querySelectorAll(".item").forEach(setEveryElement);
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



