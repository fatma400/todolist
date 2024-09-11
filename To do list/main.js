let input=document.querySelector('.input')
let plus=document.querySelector('.plus')
let tasksDiv=document.querySelector('.tasks-content')
let btn=document.getElementById('btn')
let arrayOfTasks=[];

if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}
getDataFromLocalStorage()
plus.onclick=function(){
    if(input.value!=""){
        addTasksToArray(input.value)
        input.value=""
    }
}
function addTasksToArray(taskText){
    const task= {
        id:Date.now(),
        title:taskText,
        completed:false,
    }
    arrayOfTasks.push(task);
    addElementToPageFrom(arrayOfTasks)   
    addDataToLocalStorageFrom(arrayOfTasks) 
}
function addElementToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML="";
    arrayOfTasks.forEach((task) => {
        let div=document.createElement("span")
        div.className="task";
        // check if task is done
        if(task.completed===true){
            div.className="task done";
        }
        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title))
        let span=document.createElement("span")
        span.className="delete";
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    });
}
function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))   
 
}
function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks")
    if(data){
        let task=JSON.parse(data)
        addElementToPageFrom(arrayOfTasks)
    }
}

//delete
tasksDiv.addEventListener('click',function(e){
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done")
    }
    if(e.target.classList.contains("delete")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
})
function deleteTaskWith(taskId){
    arrayOfTasks=arrayOfTasks.filter((task)=> task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
}
btn.onclick=function(){
    window.localStorage.removeItem("tasks")
    tasksDiv.innerHTML=""
}
// localStorage.clear()