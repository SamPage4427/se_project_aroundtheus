import { openModal } from "./utils.js";

/*           Card Class            */
export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  /*            Private Handlers             */
  _handleLikeButton() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImg() {
    this._previewImgModal = document.querySelector("#image-modal");
    this._previewImg = this._previewImgModal.querySelector(".modal__image");
    this._previewImgCaption =
      this._previewImgModal.querySelector(".modal__caption");

    openModal(this._previewImgModal);
    this._previewImg.src = this._link;
    this._previewImg.alt = this._name;
    this._previewImgCaption.textContent = this._name;
  }

  /*             Event Listeners             */
  _setEventListeners() {
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardImgElement.addEventListener("click", () => {
      this._handlePreviewImg();
    });
  }

  /*      Card Template       */
  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /*             Card View           */
  getCardElement() {
    this._cardElement = this._getElement();

    this._cardImgElement = this._cardElement.querySelector(".card__image");
    const titleElement = this._cardElement.querySelector(".card__title");

    this._setEventListeners();

    this._cardImgElement.src = this._link;
    this._cardImgElement.alt = this._name;
    titleElement.textContent = this._name;
    return this._cardElement;
  }
}
