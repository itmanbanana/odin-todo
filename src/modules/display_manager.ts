import { ToDoManager } from "./todo_manager.js";
import type { ToDoItem } from "./todo_item.js";
import type { ToDoProject } from "./todo_project.js";

const DisplayManager = (() => {
    const content: HTMLDivElement = document.querySelector(".content") as HTMLDivElement;

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

    const updateToDoManagerDisplay = () => {

    };

    const updateToDoProjectDisplay = (project: ToDoProject) => {
        const projectDiv: HTMLDivElement = document.createElement("div");
        projectDiv.classList.add("project");

        const projectTitleDiv: HTMLDivElement = document.createElement("div");
        const projectDescDiv: HTMLDivElement = document.createElement("div");
        const projectItemsList: HTMLUListElement = document.createElement("ul");
    
        projectTitleDiv.textContent = project.title;
        projectDescDiv.textContent = project.desc;

        projectDiv.appendChild(projectTitleDiv);
        projectDiv.appendChild(projectDescDiv);
        projectDiv.appendChild(projectItemsList);

        content.appendChild(projectDiv);
    };
    
    const updateToDoItemDisplay = (item: ToDoItem) => {

    };

    const openForm = (form: HTMLFormElement) => {
        if (!form.classList.contains("open")) form.classList.add("open");
    };

    const closeForm = (form: HTMLFormElement) => {
        if (form.classList.contains("open")) form.classList.remove("open");
    };

    return { 
        updateToDoManagerDisplay, 
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    }
})();

export { DisplayManager };