/*           Config            */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

/*          Show/Hide Errors            */
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

/*          Check Validity           */
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*           Event Listeners           */
function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, options);
      toggleFormButtonState(inputList, buttonElement, options);
    });
  });

  toggleFormButtonState(inputList, buttonElement, options);
}

/*          Button Enable/Disable             */
function disableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disable = true;
}

function enableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disable = false;
}

function toggleFormButtonState(
  inputList,
  buttonElement,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, { inactiveButtonClass });
  } else {
    enableButton(buttonElement, { inactiveButtonClass });
  }
}

/*          Enable Validation            */
function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

enableValidation(config);
