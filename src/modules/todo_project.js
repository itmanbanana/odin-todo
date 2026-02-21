import { ToDoItem } from "./todo_item.js";
class ToDoProject {
    _id;
    _title;
    _desc;
    _itemList = [];
    constructor(title, desc) {
        this._id = crypto.randomUUID();
        this._title = title;
        this._desc = desc;
    }
    addToDoItem(item) {
        this._itemList.push(item);
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