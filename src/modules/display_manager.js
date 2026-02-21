import { ToDoManager } from "./todo_manager.js";
const DisplayManager = (() => {
    const projectContainerDiv = document.querySelector(".project-container");
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
    const updateToDoProjectDisplay = () => {
        projectContainerDiv.innerHTML = "";
        ToDoManager.getProjectList().forEach((project) => {
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.dataset.id = project.id;
            let projectTitleDiv = document.createElement("div");
            let projectDescDiv = document.createElement("div");
            let projectItemsList = document.createElement("ul");
            let projectAddItemButton = document.createElement("button");
            let projectDeleteButton = document.createElement("button");
            projectAddItemButton.addEventListener("click", (e) => {
                e.preventDefault();
                // do something with add item form
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
            projectDiv.appendChild(projectItemsList);
            projectDiv.appendChild(projectAddItemButton);
            projectDiv.appendChild(projectDeleteButton);
            projectContainerDiv.appendChild(projectDiv);
        });
    };
    const updateToDoItemDisplay = (project) => {
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