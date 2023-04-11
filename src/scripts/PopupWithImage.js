import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(".modal__image");
    this._modalCaption = this._modalElement.querySelector(".modal__caption");
  }
  open(name, link) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
