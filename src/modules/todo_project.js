import { ToDoItem } from "./todo_item.js";
class ToDoProject {
    _title;
    _desc;
    _itemList = [];
    constructor(title, desc) {
        this._title = title;
        this._desc = desc;
    }
    addToDoItem(item) {
        this._itemList.push(item);
    }
    get itemList() { return this._itemList; }
    get title() { return this._title; }
    set title(newTitle) { this._title = newTitle; }
    get desc() { return this._desc; }
    set desc(newDesc) { this._desc = newDesc; }
}
export { ToDoProject };
//# sourceMappingURL=todo_project.js.map