export class Section {
  // Constructor to initialize items and container
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  // Method to render all items on the page
  renderItems() {
    this.items.forEach((item) => {
      this.addItem(this.renderer(item));
    });
  }

  // Method to add a single item to the DOM
  addItem(element) {
    this.container.prepend(element);
  }
}
