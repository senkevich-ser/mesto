export default class Section{
  constructor({data,renderer},containerSelector){
    this._renderItems= data;
    this._cardContainer = document.querySelector(containerSelector);
    this._renderer = renderer;
    console.log(this._renderItems)
  }

  addItem(element){
    this._cardContainer.prepend(element)  
  }
  renderItems(){
    this._renderItems.forEach(item => {
      this._renderer (item)
    });
  }
}