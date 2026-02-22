import { ToDoManager } from "./todo_manager.js";
const DisplayManager = (() => {
    const effectElement = document.querySelector("div.effect");
    const projectContainerDiv = document.querySelector(".project-container");
    const projectTitle = document.querySelector("#project-title");
    const projectDescription = document.querySelector("#project-description");
    const charsLeftSpan = document.querySelector("span.chars-left");
    const updateChars = () => {
        charsLeftSpan.innerHTML = `${500 - projectDescription.value.length}`;
    };
    projectDescription.addEventListener("keydown", updateChars);
    projectDescription.addEventListener("change", updateChars);
    const addProjectButton = document.querySelector(".add-project-button");
    const projectForm = document.querySelector(".project-form");
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(projectForm);
    });
    const submitProjectButton = document.querySelector(".submit-project-button");
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        // logic to handle editing project title/desc vs. adding new project
        if (projectForm.classList.contains("edit")) {
            let project = ToDoManager.getProjectFromID(projectForm.id);
            console.log(project);
            if (project !== null) {
                project.title = projectTitle.value;
                project.desc = projectDescription.value;
            }
            projectForm.id = "";
            ToDoManager.saveToDoContent();
            updateToDoProjectDisplay();
        }
        else
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
            projectTitleDiv.classList.add("project-title");
            let projectDescDiv = document.createElement("div");
            projectDescDiv.classList.add("project-desc");
            let projectItemsList = document.createElement("ul");
            projectItemsList.classList.add("project-items-list");
            let projectSettingsDiv = document.createElement("div");
            projectSettingsDiv.classList.add("project-settings");
            let projectAddItemButton = document.createElement("button");
            projectAddItemButton.classList.add("project-add-item-button");
            let projectEditButton = document.createElement("button");
            projectEditButton.classList.add("project-edit-button");
            let projectDeleteButton = document.createElement("button");
            projectDeleteButton.classList.add("project-delete-button");
            projectItemsList.dataset.id = project.id;
            projectAddItemButton.addEventListener("click", (e) => {
                e.preventDefault();
                let today = new Date(Date.now());
                project.addToDoItem("List item", `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
            });
            projectEditButton.addEventListener("click", (e) => {
                e.preventDefault();
                editForm(projectForm, project);
            });
            projectDeleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                ToDoManager.deleteToDoProject(project);
                updateToDoProjectDisplay();
            });
            projectTitleDiv.textContent = project.title;
            projectDescDiv.textContent = project.desc;
            projectAddItemButton.textContent = "Add Item";
            projectEditButton.textContent = "Edit Project";
            projectDeleteButton.textContent = "Delete Project";
            projectDiv.appendChild(projectTitleDiv);
            projectDiv.appendChild(projectDescDiv);
            projectSettingsDiv.appendChild(projectEditButton);
            projectSettingsDiv.appendChild(projectDeleteButton);
            projectDiv.appendChild(projectSettingsDiv);
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
            let itemDivElement = document.createElement("li");
            itemDivElement.classList.add("project-item-container");
            let itemTitleElement = document.createElement("input");
            itemTitleElement.type = "text";
            itemTitleElement.id = "item-title";
            itemTitleElement.maxLength = 40;
            itemTitleElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.title = itemTitleElement.value;
            });
            let itemDueDateElement = document.createElement("input");
            let itemDueDateLabelElement = document.createElement("label");
            itemDueDateElement.type = "date";
            itemDueDateElement.id = "item-date";
            itemDueDateLabelElement.classList.add("item-date-label");
            itemDueDateLabelElement.textContent = "Due Date:";
            itemDueDateElement.addEventListener("input", (e) => {
                e.preventDefault();
                console.log(itemDueDateElement.value);
                item.dueDate = itemDueDateElement.value;
                console.log(item.dueDate);
            });
            let itemPriorityElement = document.createElement("select");
            let itemPriorityLabelElement = document.createElement("label");
            itemPriorityElement.innerHTML = `
                <option value="high">⬆ High</option>
                <option value="medium">― Medium</option>
                <option value="low">⬇ Low</option>
            `;
            itemPriorityElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.priority = itemPriorityElement.value;
            });
            itemPriorityElement.id = "item-priority";
            itemPriorityLabelElement.classList.add("item-priority-label");
            itemPriorityLabelElement.textContent = "Priority:";
            let itemCompletedElement = document.createElement("input");
            itemCompletedElement.type = "checkbox";
            itemCompletedElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.completed = itemCompletedElement.checked;
            });
            itemCompletedElement.id = "item-completed";
            let itemDeleteButton = document.createElement("button");
            itemDeleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                project.removeToDoItem(item);
            });
            itemDeleteButton.classList.add("item-delete-button");
            itemTitleElement.value = item.title;
            itemDueDateElement.value = item.dueDate;
            itemPriorityElement.value = item.priority;
            itemCompletedElement.checked = item.completed;
            itemDeleteButton.textContent = "";
            itemDivElement.appendChild(itemTitleElement);
            itemDueDateLabelElement.appendChild(itemDueDateElement);
            itemDivElement.appendChild(itemDueDateLabelElement);
            itemPriorityLabelElement.appendChild(itemPriorityElement);
            itemDivElement.appendChild(itemPriorityLabelElement);
            itemDivElement.appendChild(itemCompletedElement);
            itemDivElement.appendChild(itemDeleteButton);
            itemListElement.appendChild(itemDivElement);
        });
    };
    const openForm = (form) => {
        if (!form.classList.contains("open")) {
            form.classList.add("open");
            effectElement.classList.add("open");
        }
    };
    const editForm = (form, project) => {
        if (!form.classList.contains("open")) {
            form.classList.add("open", "edit");
            form.id = project.id; // don't do this
            effectElement.classList.add("open");
            projectTitle.value = project.title;
            projectDescription.value = project.desc;
        }
    };
    const closeForm = (form) => {
        if (form.classList.contains("open")) {
            form.classList.remove("open", "edit");
            effectElement.classList.remove("open");
        }
    };
    return {
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    };
})();
export { DisplayManager };
//# sourceMappingURL=display_manager.js.map