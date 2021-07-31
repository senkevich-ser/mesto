export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderItems = data;
    this._cardContainer = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._cardContainer.prepend(element);
  }
  renderItems() {
    console.log(this._renderItems);
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
