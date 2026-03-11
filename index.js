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
  name: "Football with Friends",
  duration: "1h-20min",
  difficulty: 1,
  notes:"Show up 15minutes earlier"
}

let tasks = [task1,task2,task3,task4,task5];

//task column initialize
let column = document.getElementById("to-do");
//create new elements
for (let i=0; i<tasks.length; i++){
  let sp = document.createElement("span");
  sp.innerHTML = tasks[i].name;
  sp.classList.add("item");
  sp.draggable = true;
  column.appendChild(sp);
}

//add listeners for source zone
let dragged;

document.querySelectorAll(".item").forEach(setEveryElement);
document.querySelectorAll(".dropzone").forEach(setEveryZone);

function setEveryElement(item) {
  item.addEventListener("drag",onDrag);
}

function onDrag(event){
  dragged = event.target;
  event.target.classList.add("dragging");
  dragged.addEventListener("dragstart", letDrop);
  //console.log(dragged);
}

function letDrop(event){
  event.target.addEventListener("dragend", ()=>{
    event.target.classList.remove("dragging");
    //console.log(event.target);
  });
}

//add listeners for every zone

function setEveryZone(zone){
  zone.addEventListener("dragover",(event)=>{
    event.preventDefault();
  })
  onDragging(zone);
}

function onDragging(zone){
  zone.addEventListener("dragenter",(event)=>{
    if(event.target.classList.contains("dropzone")){
      event.target.classList.add("dragover");
    }
  })
  onLeaving(zone);
}

function onLeaving(zone){
  zone.addEventListener("dragleave",(event)=>{
    if(event.target.classList.contains("dropzone")){
      event.target.classList.remove("dragover");
    }
  })
  addItem(zone);
}

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



