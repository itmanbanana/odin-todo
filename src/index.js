import { ToDoItem } from "./modules/todo_item.js";
import { ToDoManager } from "./modules/todo_manager.js";
import { ToDoProject } from "./modules/todo_project.js";
let testProject = new ToDoProject("Test Project", "Description 1234");
let due = new Date(Date.now());
let testItem = new ToDoItem(testProject, "Item 0", "Thing", due, "high");
testProject.addToDoItem(testItem);
ToDoManager.addToDoProject(testProject);
console.log(ToDoManager.getProjectList());
//# sourceMappingURL=index.js.map