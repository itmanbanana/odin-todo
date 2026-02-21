import { ToDoProject } from "./todo_project.js";
import { ToDoManager } from "./todo_manager.js";
class ToDoItem {
    _projectID;
    _title;
    _dueDate;
    _priority;
    _completed;
    constructor(projectID, title = "List item", dueDate = "2026-01-01", priority = "medium", completed = false) {
        this._projectID = projectID;
        this._title = title;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }
    get projectID() { return this._projectID; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; ToDoManager.saveToDoContent(); }
    get dueDate() { return this._dueDate; }
    set dueDate(newDueDate) { this._dueDate = newDueDate; ToDoManager.saveToDoContent(); }
    get priority() { return this._priority; }
    set priority(newPriority) { this._priority = newPriority; ToDoManager.saveToDoContent(); }
    get completed() { return this._completed; }
    set completed(newStatus) { this._completed = newStatus; ToDoManager.saveToDoContent(); }
}
export { ToDoItem };
//# sourceMappingURL=todo_item.js.map