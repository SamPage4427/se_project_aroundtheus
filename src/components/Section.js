/* class section
object with 2 parameters, item and renderer
css class selector
stores public method renderItems()
renderer() function for rendering each item
public method addItem() takes DOM element and adds to container */
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
