import { ToDoProject } from "./todo_project.js";

const ToDoManager = (() => {
    let projectList: ToDoProject[] = [];

    const getProjectList = () => projectList;
    const addToDoProject = (project: ToDoProject) => {
        projectList.push(project);
    }
    const deleteToDoProject = (project: ToDoProject) => {
        if (projectList.includes(project)) {
            let index = projectList.indexOf(project);
            projectList.splice(index, 1);
        }
    }

    return { getProjectList, addToDoProject, deleteToDoProject }
})();

export { ToDoManager };