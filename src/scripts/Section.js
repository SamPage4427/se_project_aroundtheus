/* class section
object with 2 parameters, item and renderer
css class selector
stores public method renderItems()
renderer() function for rendering each item
public method addItem() takes DOM element and adds to container */
class Section {
  constructor({ item, renderer }, classSelector) {
    this._renderItems = item;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }
  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._classSelector.append(element);
  }
}

export default Section;
