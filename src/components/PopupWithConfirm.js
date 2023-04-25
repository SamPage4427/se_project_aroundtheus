import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._confirmButton = this._modalForm.querySelector("#delete-btn-submit");
  }

  submitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}

export default PopupWithConfirm;
