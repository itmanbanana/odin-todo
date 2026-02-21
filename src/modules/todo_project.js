import { DisplayManager } from "./display_manager.js";
import { ToDoItem } from "./todo_item.js";
class ToDoProject {
    _id;
    _title;
    _desc;
    _itemList = [];
    constructor(title = "", desc = "") {
        this._id = crypto.randomUUID();
        console.log(this._id);
        this._title = title;
        this._desc = desc;
    }
    addToDoItem(title, dueDate, priority) {
        this._itemList.push(new ToDoItem(this, title, dueDate, priority, false));
        DisplayManager.updateToDoItemDisplay(this);
    }
    removeToDoItem(item) {
        if (this._itemList.includes(item)) {
            let index = this._itemList.indexOf(item);
            this._itemList.splice(index, 1);
            DisplayManager.updateToDoItemDisplay(this);
        }
    }
    get itemList() { return this._itemList; }
    get id() { return this._id; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; }
    get desc() { return this._desc; }
    set desc(newDesc) { this._desc = newDesc; }
}
export { ToDoProject };
//# sourceMappingURL=todo_project.js.map