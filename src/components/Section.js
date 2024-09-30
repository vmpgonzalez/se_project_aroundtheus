export class Section {
  // Constructor to initialize items and container
  constructor({ items, renderer }, containerSelector) {
    this.items = items; // Array of data items
    this.renderer = renderer; // Function to create a single item
    this.container = document.querySelector(containerSelector); // Select the container for the items
  }

  // Method to render all items on the page
  renderItems() {
    this.items.forEach((item) => {
      this.addItem(this.renderer(item)); // Call the renderer for each item and add to DOM
    });
  }

  // Method to add a single item to the DOM
  addItem(element) {
    this.container.prepend(element); // Prepend the element to the container
  }
}
