export type Priority = "high" | "medium" | "low";
declare class ToDoItem {
    _projectID: string;
    _title: string;
    _dueDate: string;
    _priority: Priority;
    _completed: boolean;
    constructor(projectID: string, title?: string, dueDate?: string, priority?: Priority, completed?: boolean);
    get projectID(): string;
    get title(): string;
    set title(newTitle: string);
    get dueDate(): string;
    set dueDate(newDueDate: string);
    get priority(): Priority;
    set priority(newPriority: Priority);
    get completed(): boolean;
    set completed(newStatus: boolean);
}
export { ToDoItem };
//# sourceMappingURL=todo_item.d.ts.map