import { ToDoManager } from "./todo_manager.js";
const DisplayManager = (() => {
    const content = document.querySelector(".content");
    const projectTitle = document.querySelector("#project-title");
    const projectDescription = document.querySelector("#project-description");
    const addProjectButton = document.querySelector(".add-project-button");
    addProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        openForm(addProjectForm);
    });
    const submitProjectButton = document.querySelector(".submit-project-button");
    submitProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        ToDoManager.addToDoProject(projectTitle.value, projectDescription.value);
        projectTitle.value = "";
        projectDescription.value = "";
        closeForm(addProjectForm);
    });
    const addProjectForm = document.querySelector(".project-form");
    const updateToDoManagerDisplay = () => {
    };
    const updateToDoProjectDisplay = (project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        const projectTitleDiv = document.createElement("div");
        const projectDescDiv = document.createElement("div");
        const projectItemsList = document.createElement("ul");
        projectTitleDiv.textContent = project.title;
        projectDescDiv.textContent = project.desc;
        projectDiv.appendChild(projectTitleDiv);
        projectDiv.appendChild(projectDescDiv);
        projectDiv.appendChild(projectItemsList);
        content.appendChild(projectDiv);
    };
    const updateToDoItemDisplay = (item) => {
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
        updateToDoManagerDisplay,
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    };
})();
export { DisplayManager };
//# sourceMappingURL=display_manager.js.map