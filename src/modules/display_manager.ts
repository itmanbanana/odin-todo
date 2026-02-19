import { ToDoManager } from "./todo_manager.js";
import type { ToDoItem } from "./todo_item.js";
import type { ToDoProject } from "./todo_project.js";

const DisplayManager = (() => {
    const updateToDoManagerDisplay = () => {

    };

    const updateToDoProjectDisplay = (project: ToDoProject) => {

    };
    
    const updateToDoItemDisplay = (item: ToDoItem) => {

    };

    return { 
        updateToDoManagerDisplay, 
        updateToDoProjectDisplay,
        updateToDoItemDisplay
    }
})();

export { DisplayManager };