/*      Form Validator Class      */
export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitBtnSelector = config.submitButtonSelector;
    this._inactiveBtnClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formELement = formElement;
  }

  /*      Check Validity      */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputElement) {
    return inputElement.validity.valid;
  }

  /* Form Event Listeners */
  _setFormEventListeners() {
    this._inputElements = [
      ...this._formELement.querySelectorAll(this._inputSelector),
    ];
    this._submitBtn = this._formELement.querySelector(this._submitBtnSelector);

    this.toggleButtonState();
    this._inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  /*       Enable/Disable Buttons      */
  _disableButton() {
    this._submitBtn.classList.add(this._inactiveBtnClass);
    this._submitBtn.disabled = true;
  }

  _enableButton() {
    this._submitBtn.classList.remove(this._inactiveBtnClass);
    this._submitBtn.disabled = false;
  }

  /*       Toggle Button State       */
  toggleButtonState() {
    if (!this._inputElements.every(this._hasInvalidInput)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  /*      Event Handlers       */
  _showInputError(inputElement) {
    const errorElement = this._formELement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formELement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  /*       Enable Form Validation       */
  enableValidation() {
    this._formElements = [...document.querySelectorAll(this._formSelector)];

    this._formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setFormEventListeners();
    });
  }
}
