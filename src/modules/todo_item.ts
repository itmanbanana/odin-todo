import { ToDoProject } from "./todo_project.js";

export type Priority = "high" | "medium" | "low";

class ToDoItem {
    _project: ToDoProject;
    _title: string;
    _dueDate: Date;
    _priority: Priority;
    _completed: boolean;

    constructor(project: ToDoProject, title: string, dueDate: Date, priority: Priority, completed: boolean = false) {
        this._project = project;
        this._title = title;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }

    get project(): ToDoProject { return this._project; }

    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; }
    
    get dueDate(): Date { return this._dueDate }
    set dueDate(newDueDate: Date) { this._dueDate = newDueDate }

    get priority(): Priority { return this._priority; }
    set priority(newPriority: Priority) { this._priority = newPriority; }

    get completed(): boolean { return this._completed; }
    set completed(newStatus: boolean) { this._completed = newStatus; }
}

export { ToDoItem } 