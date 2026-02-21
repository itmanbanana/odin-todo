import { ToDoManager } from "./todo_manager.js";
import type { ToDoItem } from "./todo_item.js";
import type { ToDoProject } from "./todo_project.js";

const DisplayManager = (() => {
    const projectContainerDiv: HTMLDivElement = document.querySelector(".project-container") as HTMLDivElement;

    const projectTitle: HTMLInputElement = document.querySelector("#project-title") as HTMLInputElement;
    const projectDescription: HTMLTextAreaElement = document.querySelector("#project-description") as HTMLTextAreaElement;
    const addProjectButton: HTMLButtonElement = document.querySelector(".add-project-button") as HTMLButtonElement;
    
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(addProjectForm);
    });
    const submitProjectButton: HTMLButtonElement = document.querySelector(".submit-project-button") as HTMLButtonElement;
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        ToDoManager.addToDoProject(projectTitle.value, projectDescription.value);
        projectTitle.value = ""; 
        projectDescription.value = "";
        
        closeForm(addProjectForm);
    });

    const addProjectForm: HTMLFormElement = document.querySelector(".project-form") as HTMLFormElement;

    const updateToDoProjectDisplay = () => {
        projectContainerDiv.innerHTML = "";
        ToDoManager.getProjectList().forEach((project) => {
            let projectDiv: HTMLDivElement = document.createElement("div");
            
            projectDiv.classList.add("project");

            let projectTitleDiv: HTMLDivElement = document.createElement("div");
            let projectDescDiv: HTMLDivElement = document.createElement("div");
            let projectItemsList: HTMLUListElement = document.createElement("ul");
            let projectDeleteButton: HTMLButtonElement = document.createElement("button");
            
            projectDeleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                ToDoManager.deleteToDoProject(project);
                updateToDoProjectDisplay();
            });

            projectTitleDiv.textContent = project.title;
            projectDescDiv.textContent = project.desc;
            projectDeleteButton.textContent = "Delete Project";

            projectDiv.appendChild(projectTitleDiv);
            projectDiv.appendChild(projectDescDiv);
            projectDiv.appendChild(projectItemsList);
            projectDiv.appendChild(projectDeleteButton);

            projectContainerDiv.appendChild(projectDiv);
        });
    };
    
    const updateToDoItemDisplay = (project: ToDoProject) => {

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