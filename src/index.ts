import { ToDoItem, type Priority } from "./modules/todo_item.js";
import { ToDoManager } from "./modules/todo_manager.js";
import { ToDoProject } from "./modules/todo_project.js";

let testProject = new ToDoProject("Test Project", "Description 1234") as ToDoProject;
let due: Date = new Date(Date.now());
let testItem = new ToDoItem(testProject, "Item 0", "Thing", due, "high" as Priority);
testProject.addToDoItem(testItem);
ToDoManager.addToDoProject(testProject);

console.log(ToDoManager.getProjectList());