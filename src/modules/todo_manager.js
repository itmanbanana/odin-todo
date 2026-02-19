import { ToDoProject } from "./todo_project.js";
const ToDoManager = (() => {
    let projectList = [];
    const getProjectList = () => projectList;
    const addToDoProject = (project) => {
        projectList.push(project);
    };
    const deleteToDoProject = (project) => {
        if (projectList.includes(project)) {
            let index = projectList.indexOf(project);
            projectList.splice(index, 1);
        }
    };
    return { getProjectList, addToDoProject, deleteToDoProject };
})();
export { ToDoManager };
//# sourceMappingURL=todo_manager.js.map