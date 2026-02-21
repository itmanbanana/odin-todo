import { ToDoProject } from "./todo_project.js";
declare const ToDoManager: {
    getProjectList: () => ToDoProject[];
    addToDoProject: (projectTitle: string, projectDesc: string) => void;
    deleteToDoProject: (project: ToDoProject) => void;
};
export { ToDoManager };
//# sourceMappingURL=todo_manager.d.ts.map