import { ToDoManager } from "./todo_manager.js";
import type { Priority, ToDoItem } from "./todo_item.js";
import type { ToDoProject } from "./todo_project.js";

const DisplayManager = (() => {
    const effectElement: HTMLDivElement = document.querySelector("div.effect") as HTMLDivElement;
    
    const projectContainerDiv: HTMLDivElement = document.querySelector(".project-container") as HTMLDivElement;

    const projectTitle: HTMLInputElement = document.querySelector("#project-title") as HTMLInputElement;
    const projectDescription: HTMLTextAreaElement = document.querySelector("#project-description") as HTMLTextAreaElement;
    const charsLeftSpan: HTMLSpanElement = document.querySelector("span.chars-left") as HTMLSpanElement;
        
    const updateChars = () => {
        charsLeftSpan.innerHTML = `${500 - projectDescription.value.length}`;
    }
    
    projectDescription.addEventListener("keydown", updateChars);
    projectDescription.addEventListener("change", updateChars);

    const addProjectButton: HTMLButtonElement = document.querySelector(".add-project-button") as HTMLButtonElement;
    
    const projectForm: HTMLFormElement = document.querySelector(".project-form") as HTMLFormElement;
        
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(projectForm);
    });

    const submitProjectButton: HTMLButtonElement = document.querySelector(".submit-project-button") as HTMLButtonElement;
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        // logic to handle editing project title/desc vs. adding new project
        if (projectForm.classList.contains("edit")) {
            let project: ToDoProject | null = ToDoManager.getProjectFromID(projectForm.id);
            console.log(project);
            if (project !== null) {
                project.title = projectTitle.value;
                project.desc = projectDescription.value;
            }
            projectForm.id = "";
            ToDoManager.saveToDoContent();
            updateToDoProjectDisplay();
        } else ToDoManager.addToDoProject(projectTitle.value, projectDescription.value);
        
        projectTitle.value = ""; 
        projectDescription.value = "";
        
        closeForm(projectForm);
    });

    const cancelProjectButton: HTMLButtonElement = document.querySelector(".cancel-project-button") as HTMLButtonElement;
    cancelProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        projectTitle.value = ""; 
        projectDescription.value = "";
        
        closeForm(projectForm);
    });

    const updateToDoProjectDisplay = () => {
        projectContainerDiv.innerHTML = "";
        ToDoManager.getProjectList().forEach((project) => {
            let projectDiv: HTMLDivElement = document.createElement("div");
            
            projectDiv.classList.add("project");

            let projectTitleDiv: HTMLDivElement = document.createElement("div");
            projectTitleDiv.classList.add("project-title");
            let projectDescDiv: HTMLDivElement = document.createElement("div");
            projectDescDiv.classList.add("project-desc");
            let projectItemsList: HTMLUListElement = document.createElement("ul");
            projectItemsList.classList.add("project-items-list");
            let projectSettingsDiv: HTMLDivElement = document.createElement("div");
            projectSettingsDiv.classList.add("project-settings");

            let projectAddItemButton: HTMLButtonElement = document.createElement("button");
            projectAddItemButton.classList.add("project-add-item-button");
            let projectEditButton: HTMLButtonElement = document.createElement("button");
            projectEditButton.classList.add("project-edit-button");
            let projectDeleteButton: HTMLButtonElement = document.createElement("button");
            projectDeleteButton.classList.add("project-delete-button");

            projectItemsList.dataset.id = project.id;

            projectAddItemButton.addEventListener("click", (e) => {
                e.preventDefault();
                let today = new Date(Date.now())
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
    
    const updateToDoItemDisplay = (project: ToDoProject) => {
        const itemListElement: HTMLUListElement = document.querySelector(`ul[data-id="${project.id}"]`) as HTMLUListElement;
        itemListElement.innerHTML = "";

        project.itemList.forEach((item) => {
            let itemDivElement: HTMLLIElement = document.createElement("li");
            itemDivElement.classList.add("project-item-container");

            let itemTitleElement: HTMLInputElement = document.createElement("input");
            itemTitleElement.type = "text";
            itemTitleElement.id = "item-title";
            itemTitleElement.maxLength = 40;
            itemTitleElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.title = itemTitleElement.value;
            });

            let itemDueDateElement: HTMLInputElement = document.createElement("input");
            let itemDueDateLabelElement: HTMLLabelElement = document.createElement("label");
            itemDueDateElement.type = "date";
            itemDueDateElement.id = "item-date";
            itemDueDateLabelElement.classList.add("item-date-label");
            itemDueDateLabelElement.textContent = "Due Date:";
            itemDueDateElement.addEventListener("input", (e) => {
                e.preventDefault();
                console.log(itemDueDateElement.value)
                item.dueDate = itemDueDateElement.value;
                console.log(item.dueDate);
            });
            
            let itemPriorityElement: HTMLSelectElement = document.createElement("select");
            let itemPriorityLabelElement: HTMLLabelElement = document.createElement("label");
            itemPriorityElement.innerHTML = `
                <option value="high">⬆ High</option>
                <option value="medium">― Medium</option>
                <option value="low">⬇ Low</option>
            `;
            itemPriorityElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.priority = itemPriorityElement.value as Priority;
            });
            itemPriorityElement.id = "item-priority";
            itemPriorityLabelElement.classList.add("item-priority-label");
            itemPriorityLabelElement.textContent = "Priority:";

            let itemCompletedElement: HTMLInputElement = document.createElement("input");
            itemCompletedElement.type = "checkbox";
            itemCompletedElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.completed = itemCompletedElement.checked;
            });
            itemCompletedElement.id = "item-completed";
            
            let itemDeleteButton: HTMLButtonElement = document.createElement("button");
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

    const openForm = (form: HTMLFormElement) => {
        if (!form.classList.contains("open")) {
            form.classList.add("open");
            effectElement.classList.add("open");
        }
    };

    const editForm = (form: HTMLFormElement, project: ToDoProject) => {
        if (!form.classList.contains("open")) {
            form.classList.add("open", "edit");
            form.id = project.id; // don't do this
            effectElement.classList.add("open");

            projectTitle.value = project.title;
            projectDescription.value = project.desc;
        }
    }

    const closeForm = (form: HTMLFormElement) => {
        if (form.classList.contains("open")) {
            form.classList.remove("open", "edit");
            effectElement.classList.remove("open");
        }
    };

    return { 
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    }
})();

export { DisplayManager };