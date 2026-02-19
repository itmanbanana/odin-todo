import { ToDoProject } from "./todo_project.js";
class ToDoItem {
    _project;
    _title;
    _desc;
    _dueDate;
    _priority;
    _completed;
    constructor(project, title, desc, dueDate, priority, completed = false) {
        this._project = project;
        this._title = title;
        this._desc = desc;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }
    get project() { return this._project; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; }
    get desc() { return this._desc; }
    set desc(newDesc) { this._desc = newDesc; }
    get dueDate() { return this._dueDate; }
    set dueDate(newDueDate) { this._dueDate = newDueDate; }
    get priority() { return this._priority; }
    set priority(newPriority) { this._priority = newPriority; }
    get completed() { return this._completed; }
    set completed(newStatus) { this._completed = newStatus; }
}
export { ToDoItem };
//# sourceMappingURL=todo_item.js.map