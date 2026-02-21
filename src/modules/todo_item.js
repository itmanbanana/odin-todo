import { ToDoProject } from "./todo_project.js";
class ToDoItem {
    _project;
    _title;
    _dueDate;
    _priority;
    _completed;
    constructor(project, title = "List item", dueDate = "2026-01-01", priority = "medium", completed = false) {
        this._project = project;
        this._title = title;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }
    get project() { return this._project; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; }
    get dueDate() { return this._dueDate; }
    set dueDate(newDueDate) { this._dueDate = newDueDate; }
    get priority() { return this._priority; }
    set priority(newPriority) { this._priority = newPriority; }
    get completed() { return this._completed; }
    set completed(newStatus) { this._completed = newStatus; }
}
export { ToDoItem };
//# sourceMappingURL=todo_item.js.map