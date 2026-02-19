import { ToDoItem } from "./todo_item.js";

class ToDoProject {
    _title: string;
    _desc: string;
    _itemList: ToDoItem[] = [];

    constructor(title: string, desc: string) {
        this._title = title;
        this._desc = desc;
    }

    addToDoItem(item: ToDoItem) {
        this._itemList.push(item);
    }

    get itemList() { return this._itemList; }
    
    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; }
    get desc(): string { return this._desc; }
    set desc(newDesc: string) { this._desc = newDesc; }
}

export { ToDoProject }