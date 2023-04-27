import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(modalSelector) {
    super({ modalSelector });
    this._confirmButton =
      this._modalElement.querySelector("#delete-btn-submit");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isDeleting, text) {
    if (isDeleting) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}

export default PopupWithConfirm;
