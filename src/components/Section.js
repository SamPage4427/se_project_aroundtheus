class Section {
  constructor({ item, renderer }, selector) {
    this._items = item;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
  prependItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
