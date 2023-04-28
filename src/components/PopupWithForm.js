import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(modalSelector, handleSubmitForm) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._modalSubmitBtn = this._modalElement.querySelector(".modal__button");
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

  setSubmitButtonText(text) {
    this._modalSubmitBtn.textContent = text;
  }

  setEventListeners() {
    this._modalSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}

export default PopupWithForm;
