import * as css from "./styles/style.css";
import { ToDoItem, type Priority } from "./modules/todo_item.js";
import { ToDoManager } from "./modules/todo_manager.js";
import { ToDoProject } from "./modules/todo_project.js";
import { DisplayManager } from "./modules/display_manager.js";

document.addEventListener("DOMContentLoaded", () => {
    let content = localStorage.getItem("todo");
    if (content !== null) ToDoManager.loadToDoContent();
});