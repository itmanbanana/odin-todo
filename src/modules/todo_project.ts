import { DisplayManager } from "./display_manager.js";
import { ToDoManager } from "./todo_manager.js";
import { ToDoItem, type Priority } from "./todo_item.js";

class ToDoProject {
    _id: string;
    _title: string;
    _desc: string;
    _itemList: Array<ToDoItem> = [];

    constructor(title: string = "", desc: string = "", id: string = crypto.randomUUID()) {
        this._id = id;
        this._title = title;
        this._desc = desc;
    }

    addToDoItem(title?: string, dueDate?: string, priority?: Priority, completed: boolean = false) {
        this._itemList.push(new ToDoItem(this._id, title, dueDate, priority, completed));
        ToDoManager.saveToDoContent();
        DisplayManager.updateToDoItemDisplay(this);
    }

    removeToDoItem(item: ToDoItem) {
        if (this._itemList.includes(item)) {
            let index = this._itemList.indexOf(item);
            this._itemList.splice(index, 1);
            ToDoManager.saveToDoContent();
            DisplayManager.updateToDoItemDisplay(this);
        }
    }

    get itemList(): ToDoItem[] { return this._itemList; }
    set itemList(list: ToDoItem[]) { this._itemList = list }
    
    get id(): string { return this._id; }
    
    get title(): string { return this._title; }
    set title(newTitle: string) { this._title = newTitle; ToDoManager.saveToDoContent(); }
    get desc(): string { return this._desc; }
    set desc(newDesc: string) { this._desc = newDesc; ToDoManager.saveToDoContent(); }
}

export { ToDoProject }