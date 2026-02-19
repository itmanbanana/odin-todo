import { ToDoProject } from "./todo_project.js";
export type Priority = "high" | "medium" | "low";
declare class ToDoItem {
    _project: ToDoProject;
    _title: string;
    _desc: string;
    _dueDate: Date;
    _priority: Priority;
    _completed: boolean;
    constructor(project: ToDoProject, title: string, desc: string, dueDate: Date, priority: Priority, completed?: boolean);
    get project(): ToDoProject;
    get title(): string;
    set title(newTitle: string);
    get desc(): string;
    set desc(newDesc: string);
    get dueDate(): Date;
    set dueDate(newDueDate: Date);
    get priority(): Priority;
    set priority(newPriority: Priority);
    get completed(): boolean;
    set completed(newStatus: boolean);
}
export { ToDoItem };
//# sourceMappingURL=todo_item.d.ts.map