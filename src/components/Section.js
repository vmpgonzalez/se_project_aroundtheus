export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, method = "append") {
    if (method === "prepend") {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items) {
    this.clear();
    items.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement, "append");
    });
  }

  clear() {
    this._container.innerHTML = "";
  }
}
