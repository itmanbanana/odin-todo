import { ToDoProject } from "./todo_project.js";

export type Priority = "high" | "medium" | "low";

class ToDoItem {
    _project: ToDoProject;
    _title: string;
    _dueDate: string;
    _priority: Priority;
    _completed: boolean;

    constructor(project: ToDoProject, title: string = "List item", dueDate: string = "2026-01-01", priority: Priority = "medium", completed: boolean = false) {
        this._project = project;
        this._title = title;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }

    get project(): ToDoProject { return this._project; }

    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; }
    
    get dueDate(): string { return this._dueDate }
    set dueDate(newDueDate: string) { this._dueDate = newDueDate }

    get priority(): Priority { return this._priority; }
    set priority(newPriority: Priority) { this._priority = newPriority; }

    get completed(): boolean { return this._completed; }
    set completed(newStatus: boolean) { this._completed = newStatus; }
}

export { ToDoItem } 