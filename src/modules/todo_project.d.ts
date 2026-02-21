import { ToDoItem } from "./todo_item.js";
declare class ToDoProject {
    _id: string;
    _title: string;
    _desc: string;
    _itemList: ToDoItem[];
    constructor(title: string, desc: string);
    addToDoItem(item: ToDoItem): void;
    get itemList(): ToDoItem[];
    get id(): string;
    get title(): string;
    set title(newTitle: string);
    get desc(): string;
    set desc(newDesc: string);
}
export { ToDoProject };
//# sourceMappingURL=todo_project.d.ts.map