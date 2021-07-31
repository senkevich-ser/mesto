export default class Section {
  constructor({ renderer }, containerSelector) {
    this._cardContainer = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._cardContainer.prepend(element);
  }
  renderItems(dataCards) {
    dataCards.forEach((item) => {
      this._renderer(item);
    });
  }
}
