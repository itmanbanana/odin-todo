import { DisplayManager } from "./display_manager.js";
import { ToDoItem, type Priority } from "./todo_item.js";

class ToDoProject {
    _id: string;
    _title: string;
    _desc: string;
    _itemList: Array<ToDoItem> = [];

    constructor(title: string = "", desc: string = "") {
        this._id = crypto.randomUUID();
        console.log(this._id);
        this._title = title;
        this._desc = desc;
    }

    addToDoItem(title?: string, dueDate?: string, priority?: Priority) {
        this._itemList.push(new ToDoItem(this, title, dueDate, priority, false));
        DisplayManager.updateToDoItemDisplay(this);
    }

    removeToDoItem(item: ToDoItem) {
        if (this._itemList.includes(item)) {
            let index = this._itemList.indexOf(item);
            this._itemList.splice(index, 1);
            DisplayManager.updateToDoItemDisplay(this);
        }
    }

    get itemList(): ToDoItem[] { return this._itemList; }
    get id(): string { return this._id; }
    
    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; }
    get desc(): string { return this._desc; }
    set desc(newDesc: string) { this._desc = newDesc; }
}

export { ToDoProject }