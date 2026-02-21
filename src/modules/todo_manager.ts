import { DisplayManager } from "./display_manager.js";
import { ToDoProject } from "./todo_project.js";

const ToDoManager = (() => {
    let projectList: ToDoProject[] = [];

    const getProjectList = () => projectList;
    
    const addToDoProject = (projectTitle: string = "", projectDesc: string = "") => {
        let project = new ToDoProject(projectTitle, projectDesc);
        projectList.push(project);

        DisplayManager.updateToDoProjectDisplay();
    };

    const deleteToDoProject = (project: ToDoProject) => {
        if (projectList.includes(project)) {
            let index = projectList.indexOf(project);
            projectList.splice(index, 1);
        }
    };

    return { getProjectList, addToDoProject, deleteToDoProject }
})();

export { ToDoManager };