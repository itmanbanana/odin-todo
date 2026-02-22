import { DisplayManager } from "./display_manager.js";
import { ToDoProject } from "./todo_project.js";
import { ToDoItem } from "./todo_item.js";

const ToDoManager = (() => {
    let projectList: ToDoProject[] = [];

    const getProjectList = () => projectList;
    
    const getProjectFromID = (id: string): ToDoProject | null => {
        let projectRef = null;
        projectList.forEach((project) => {
            if (project.id === id) projectRef = project; return;
        });
        return projectRef;
    };

    const addToDoProject = (projectTitle: string = "", projectDesc: string = "") => {
        let project = new ToDoProject(projectTitle, projectDesc);
        projectList.push(project);

        saveToDoContent();
        DisplayManager.updateToDoProjectDisplay();
    };

    const deleteToDoProject = (project: ToDoProject) => {
        if (projectList.includes(project)) {
            let index = projectList.indexOf(project);
            projectList.splice(index, 1);
            saveToDoContent();
        }
    };
    
    const saveToDoContent = () => {
        localStorage.setItem("todo", JSON.stringify(projectList));
    };

    const loadToDoContent = () => {
        let content = localStorage.getItem("todo");
        if (content !== null) {
            let contentJSON = JSON.parse(content);
            console.log(contentJSON);

            contentJSON.forEach((projectJSON: ToDoProject) => {
                let newProject = new ToDoProject(projectJSON._title, projectJSON._desc, projectJSON._id);
                let newItemList: ToDoItem[] = []
                projectJSON._itemList.forEach((itemJSON: ToDoItem) => {
                    console.log(itemJSON);
                    let newItem = new ToDoItem(itemJSON._projectID, itemJSON._title, itemJSON._dueDate, itemJSON._priority, itemJSON._completed);
                    newItemList.push(newItem);
                });
                newProject.itemList = newItemList;
                projectList.push(newProject);
            });

            DisplayManager.updateToDoProjectDisplay();
        }
    };

    return { 
        getProjectList, 
        getProjectFromID,
        addToDoProject, 
        deleteToDoProject, 
        saveToDoContent, 
        loadToDoContent 
    }
})();

export { ToDoManager };