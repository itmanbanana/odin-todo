import { ToDoItem } from "./todo_item.js";

class ToDoProject {
    _id: string;
    _title: string;
    _desc: string;
    _itemList: ToDoItem[] = [];

    constructor(title: string, desc: string) {
        this._id = crypto.randomUUID();
        this._title = title;
        this._desc = desc;
    }

    addToDoItem(item: ToDoItem) {
        this._itemList.push(item);
    }

    get itemList() { return this._itemList; }
    get id() { return this._id; }
    
    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; }
    get desc(): string { return this._desc; }
    set desc(newDesc: string) { this._desc = newDesc; }
}

export { ToDoProject }