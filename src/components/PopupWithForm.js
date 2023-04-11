import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(modalSelector, handleSubmitForm) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._modalInputs = this._modalElement.querySelectorAll(".modal__input");
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    const inputValues = {};
    this._modalInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}

export default PopupWithForm;
