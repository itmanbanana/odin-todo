import { DisplayManager } from "./display_manager.js";
import { ToDoManager } from "./todo_manager.js";
import { ToDoItem } from "./todo_item.js";
class ToDoProject {
    _id;
    _title;
    _desc;
    _itemList = [];
    constructor(title = "", desc = "", id = crypto.randomUUID()) {
        this._id = id;
        this._title = title;
        this._desc = desc;
    }
    addToDoItem(title, dueDate, priority, completed = false) {
        this._itemList.push(new ToDoItem(this._id, title, dueDate, priority, completed));
        ToDoManager.saveToDoContent();
        DisplayManager.updateToDoItemDisplay(this);
    }
    removeToDoItem(item) {
        if (this._itemList.includes(item)) {
            let index = this._itemList.indexOf(item);
            this._itemList.splice(index, 1);
            ToDoManager.saveToDoContent();
            DisplayManager.updateToDoItemDisplay(this);
        }
    }
    get itemList() { return this._itemList; }
    set itemList(list) { this._itemList = list; }
    get id() { return this._id; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; ToDoManager.saveToDoContent(); }
    get desc() { return this._desc; }
    set desc(newDesc) { this._desc = newDesc; ToDoManager.saveToDoContent(); }
}
export { ToDoProject };
//# sourceMappingURL=todo_project.js.map