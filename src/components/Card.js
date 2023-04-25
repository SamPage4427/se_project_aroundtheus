/*           Card Class            */
export default class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  /*            Private Handlers             */
  _handleLikeButton() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /*             Event Listeners             */
  _setEventListeners() {
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImgElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
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
