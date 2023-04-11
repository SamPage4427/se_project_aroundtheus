/* single parameter for selecting popup
public methods open() and close()
private method handleEscClose() with logic for closing with ESC key
public setEventListeners() adds click event to the close button and when click in grey area */
import { ESC_KEYCODE } from "../utils/constants.js";

class Popup {
  constructor({ modalSelector }) {
    this._modalElement = modalSelector;
  }

  open() {
    this._modalElement.classList.add("modal__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.which === ESC_KEYCODE) {
      this.close();
    }
  };

  _handleOverlayClose(e) {
    if (e.target.classList.contains("modal__opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    this._modalElement.addEventListener("mousedown", (e) =>
      this._handleOverlayClose(e)
    );
  }
}

export default Popup;
