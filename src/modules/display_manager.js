import { ToDoManager } from "./todo_manager.js";
const DisplayManager = (() => {
    const projectContainerDiv = document.querySelector(".project-container");
    const projectTitle = document.querySelector("#project-title");
    const projectDescription = document.querySelector("#project-description");
    const addProjectButton = document.querySelector(".add-project-button");
    const projectForm = document.querySelector(".project-form");
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(projectForm);
    });
    // refactor later to clean up submit/cancel buttons
    const submitProjectButton = document.querySelector(".submit-project-button");
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        ToDoManager.addToDoProject(projectTitle.value, projectDescription.value);
        projectTitle.value = "";
        projectDescription.value = "";
        closeForm(projectForm);
    });
    const cancelProjectButton = document.querySelector(".cancel-project-button");
    cancelProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        projectTitle.value = "";
        projectDescription.value = "";
        closeForm(projectForm);
    });
    const updateToDoProjectDisplay = () => {
        projectContainerDiv.innerHTML = "";
        ToDoManager.getProjectList().forEach((project) => {
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            let projectTitleDiv = document.createElement("div");
            let projectDescDiv = document.createElement("div");
            let projectItemsList = document.createElement("ul");
            let projectAddItemButton = document.createElement("button");
            let projectDeleteButton = document.createElement("button");
            projectItemsList.dataset.id = project.id;
            projectAddItemButton.addEventListener("click", (e) => {
                e.preventDefault();
                let today = new Date(Date.now());
                project.addToDoItem("List item", `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
            });
            projectDeleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                ToDoManager.deleteToDoProject(project);
                updateToDoProjectDisplay();
            });
            projectTitleDiv.textContent = project.title;
            projectDescDiv.textContent = project.desc;
            projectAddItemButton.textContent = "Add Item";
            projectDeleteButton.textContent = "Delete Project";
            projectDiv.appendChild(projectTitleDiv);
            projectDiv.appendChild(projectDescDiv);
            projectDiv.appendChild(projectDeleteButton);
            projectDiv.appendChild(projectItemsList);
            projectDiv.appendChild(projectAddItemButton);
            projectContainerDiv.appendChild(projectDiv);
            updateToDoItemDisplay(project);
        });
    };
    const updateToDoItemDisplay = (project) => {
        const itemListElement = document.querySelector(`ul[data-id="${project.id}"]`);
        itemListElement.innerHTML = "";
        project.itemList.forEach((item) => {
            let itemDivElement = document.createElement("div");
            let itemTitleElement = document.createElement("input");
            itemTitleElement.type = "text";
            itemTitleElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.title = itemTitleElement.value;
            });
            let itemDueDateElement = document.createElement("input");
            itemDueDateElement.type = "date";
            itemDueDateElement.addEventListener("input", (e) => {
                e.preventDefault();
                console.log(itemDueDateElement.value);
                item.dueDate = itemDueDateElement.value;
                console.log(item.dueDate);
            });
            let itemPriorityElement = document.createElement("select");
            itemPriorityElement.innerHTML = `
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            `;
            itemPriorityElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.priority = itemPriorityElement.value;
            });
            let itemCompletedElement = document.createElement("input");
            itemCompletedElement.type = "checkbox";
            itemCompletedElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.completed = itemCompletedElement.checked;
            });
            let itemDeleteButton = document.createElement("button");
            itemDeleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                project.removeToDoItem(item);
            });
            itemTitleElement.value = item.title;
            itemDueDateElement.value = item.dueDate;
            itemPriorityElement.value = item.priority;
            itemCompletedElement.checked = item.completed;
            itemDeleteButton.textContent = "Delete item";
            itemDivElement.appendChild(itemTitleElement);
            itemDivElement.appendChild(itemDueDateElement);
            itemDivElement.appendChild(itemPriorityElement);
            itemDivElement.appendChild(itemCompletedElement);
            itemDivElement.appendChild(itemDeleteButton);
            itemListElement.appendChild(itemDivElement);
        });
    };
    const openForm = (form) => {
        if (!form.classList.contains("open"))
            form.classList.add("open");
    };
    const closeForm = (form) => {
        if (form.classList.contains("open"))
            form.classList.remove("open");
    };
    return {
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    };
})();
export { DisplayManager };
//# sourceMappingURL=display_manager.js.map