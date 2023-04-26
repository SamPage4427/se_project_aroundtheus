import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(modalSelector) {
    super({ modalSelector });
    this._confirmButton =
      this._modalElement.querySelector("#delete-btn-submit");
  }

  submitAction(action) {
    this._handleSubmit = action;
  }

  confirmDelete(isDeleted, del) {
    if (isDeleted) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = del;
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
