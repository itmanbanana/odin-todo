import { ToDoManager } from "./todo_manager.js";
import type { Priority, ToDoItem } from "./todo_item.js";
import type { ToDoProject } from "./todo_project.js";

const DisplayManager = (() => {
    const projectContainerDiv: HTMLDivElement = document.querySelector(".project-container") as HTMLDivElement;

    const projectTitle: HTMLInputElement = document.querySelector("#project-title") as HTMLInputElement;
    const projectDescription: HTMLTextAreaElement = document.querySelector("#project-description") as HTMLTextAreaElement;
    const addProjectButton: HTMLButtonElement = document.querySelector(".add-project-button") as HTMLButtonElement;
    
    const projectForm: HTMLFormElement = document.querySelector(".project-form") as HTMLFormElement;
        
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(projectForm);
    });

    // refactor later to clean up submit/cancel buttons
    const submitProjectButton: HTMLButtonElement = document.querySelector(".submit-project-button") as HTMLButtonElement;
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        ToDoManager.addToDoProject(projectTitle.value, projectDescription.value);
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
            let projectDescDiv: HTMLDivElement = document.createElement("div");
            let projectItemsList: HTMLUListElement = document.createElement("ul");
            let projectAddItemButton: HTMLButtonElement = document.createElement("button");
            let projectDeleteButton: HTMLButtonElement = document.createElement("button");
            
            projectItemsList.dataset.id = project.id;

            projectAddItemButton.addEventListener("click", (e) => {
                e.preventDefault();
                let today = new Date(Date.now())
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
    
    const updateToDoItemDisplay = (project: ToDoProject) => {
        const itemListElement: HTMLUListElement = document.querySelector(`ul[data-id="${project.id}"]`) as HTMLUListElement;
        itemListElement.innerHTML = "";

        project.itemList.forEach((item) => {
            let itemDivElement: HTMLDivElement = document.createElement("div");

            let itemTitleElement: HTMLInputElement = document.createElement("input");
            itemTitleElement.type = "text";
            itemTitleElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.title = itemTitleElement.value;
            });

            let itemDueDateElement: HTMLInputElement = document.createElement("input");
            itemDueDateElement.type = "date";
            itemDueDateElement.addEventListener("input", (e) => {
                e.preventDefault();
                console.log(itemDueDateElement.value)
                item.dueDate = itemDueDateElement.value;
                console.log(item.dueDate);
            });
            
            let itemPriorityElement: HTMLSelectElement = document.createElement("select");
            itemPriorityElement.innerHTML = `
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            `;
            itemPriorityElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.priority = itemPriorityElement.value as Priority;
            });

            let itemCompletedElement: HTMLInputElement = document.createElement("input");
            itemCompletedElement.type = "checkbox";
            itemCompletedElement.addEventListener("input", (e) => {
                e.preventDefault();
                item.completed = itemCompletedElement.checked;
            });
            
            let itemDeleteButton: HTMLButtonElement = document.createElement("button");
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

    const openForm = (form: HTMLFormElement) => {
        if (!form.classList.contains("open")) form.classList.add("open");
    };

    const closeForm = (form: HTMLFormElement) => {
        if (form.classList.contains("open")) form.classList.remove("open");
    };

    return { 
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    }
})();

export { DisplayManager };