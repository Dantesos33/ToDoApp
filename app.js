let input = document.querySelector(".form__input");
let add_btn = document.querySelector(".add-btn");
let task_list = document.querySelector(".task__list");
let filter = document.querySelector(".filters_list");

task_list.innerHTML = localStorage.getItem("data");

add_btn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Enter the Task First!!");
    task_list.innerHTML = "";
    saveData();
  } else {
    let task = document.createElement("li");
    task.innerText = input.value;
    task_list.appendChild(task);

    let del = document.createElement("span");
    del.innerText = "X";
    task.appendChild(del);

    let edit = document.createElement("span");
    edit.innerText = "Edit"; // Edit button with pencil icon
    edit.style.marginRight = "1.5rem";
    edit.style.borderRadius = "20px";
    edit.style.backgroundColor = "blue";
    task.insertBefore(edit, del); // Insert before delete button (assuming del exists)

    saveData();
  }
  input.value = "";
});

task_list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN" && e.target.innerText === "X") {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.tagName === "SPAN" && e.target.innerText === "Edit") {

    let current = e.target;
    let taskItem = e.target.parentElement;
    let taskText = taskItem.firstChild;
    let editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskText.textContent; // Set initial value to current text
      editInput.classList.add("edit-input"); // Add a class for styling (optional)

      // Replace the text node with the input element
      taskItem.insertBefore(editInput, taskText);
      taskText.remove();

      // Focus the input for editing
      editInput.focus();
      current.style.backgroundColor = "black";

      editInput.addEventListener("blur", () => {
        current.style.backgroundColor = "blue";
        if (editInput.value.trim() === "") {
          alert("Task cannot be empty!");
          // Restore original text if empty
          taskItem.insertBefore(taskText, editInput);
          editInput.remove();
        } else {
          taskText.textContent = editInput.value;
          taskItem.insertBefore(taskText, editInput);
          editInput.remove();
          saveData();
        }});
      console.log(current);
  }
});


        filter.addEventListener("change", filterOption); // Use "change" event
        
        function filterOption() {
            let selectedOption = filter.querySelector(".filters").value;
            let tasks = task_list.querySelectorAll("li"); // Get all task items
        
            tasks.forEach(task => {
                switch (selectedOption) {
                    case "all":
                        task.style.display = "block"; // Show all tasks
                        break;
                    case "completed":
                        if (task.classList.contains("checked")) {
                            task.style.display = "block"; // Show completed tasks
                        } else {
                            task.style.display = "none"; // Hide incomplete tasks
                        }
                        break;
                    case "incompleted":
                        if (task.classList.contains("checked")) {
                            task.style.display = "none"; // Hide completed tasks
                        } else {
                            task.style.display = "block"; // Show incomplete tasks
                        }
                        break;
                }
                saveData();
            });
        }
        

        let saveData = () => {
            localStorage.setItem("data",task_list.innerHTML);
        }