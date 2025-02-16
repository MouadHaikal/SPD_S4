const addInput = document.querySelector(".add > input");
const toDoList = document.querySelector(".list-group");
const searchInput = document.querySelector(".search > input");

function addTask(task){
    var newTask = document.createElement("li");
    newTask.className = "list-group-item d-flex justify-content-between align-items-center";

    let taskSpan = document.createElement("span");
    taskSpan.innerText = `${task}`;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "far fa-trash-alt delete";
    deleteIcon.addEventListener("click", () => {
        newTask.remove();
    });

    newTask.appendChild(taskSpan);
    newTask.appendChild(deleteIcon);

    toDoList.appendChild(newTask);
}

addInput.addEventListener("keydown", function(event){
    if (event.key == "Enter" && addInput.value.trim() !== "") {
        event.preventDefault();

        addTask(addInput.value);

        addInput.value = "";
    }
});

searchInput.addEventListener("input", x => {
    const taskList = toDoList.querySelectorAll("li");
    const searchValue = x.target.value;

    taskList.forEach(item => {
        if (!item.textContent.includes(searchValue)) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    });

});
