import { ToDoItem, type Priority } from "./todo_item.js";
declare class ToDoProject {
    _id: string;
    _title: string;
    _desc: string;
    _itemList: Array<ToDoItem>;
    constructor(title?: string, desc?: string, id?: string);
    addToDoItem(title?: string, dueDate?: string, priority?: Priority, completed?: boolean): void;
    removeToDoItem(item: ToDoItem): void;
    get itemList(): ToDoItem[];
    set itemList(list: ToDoItem[]);
    get id(): string;
    get title(): string;
    set title(newTitle: string);
    get desc(): string;
    set desc(newDesc: string);
}
export { ToDoProject };
//# sourceMappingURL=todo_project.d.ts.map