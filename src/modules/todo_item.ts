import { ToDoProject } from "./todo_project.js";
import { ToDoManager } from "./todo_manager.js";

export type Priority = "high" | "medium" | "low";

class ToDoItem {
    _projectID: string;
    _title: string;
    _dueDate: string;
    _priority: Priority;
    _completed: boolean;

    constructor(projectID: string, title: string = "List item", dueDate: string = "2026-01-01", priority: Priority = "medium", completed: boolean = false) {
        this._projectID = projectID;
        this._title = title;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }

    get projectID(): string { return this._projectID; }

    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; ToDoManager.saveToDoContent(); }
    
    get dueDate(): string { return this._dueDate }
    set dueDate(newDueDate: string) { this._dueDate = newDueDate; ToDoManager.saveToDoContent(); }

    get priority(): Priority { return this._priority; }
    set priority(newPriority: Priority) { this._priority = newPriority; ToDoManager.saveToDoContent(); }

    get completed(): boolean { return this._completed; }
    set completed(newStatus: boolean) { this._completed = newStatus; ToDoManager.saveToDoContent(); }
}

export { ToDoItem } 