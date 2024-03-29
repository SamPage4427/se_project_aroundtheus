/*           Card Class            */
export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  /*            Handlers             */
  // _handleLikeButton() {
  //   this._likeBtn.classList.toggle("card__like-button_active");
  // }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _addLikes() {
    this._likeBtn.classList.add("card__like-button_active");
  }

  _removeLikes() {
    this._likeBtn.classList.remove("card__like-button_active");
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    this._cardLike.textContent = this._likes.length;

    if (this.isLiked()) {
      return this._addLikes();
    } else {
      return this._removeLikes();
    }
  }

  /*             Event Listeners             */
  _setEventListeners() {
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
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
    this._titleElement = this._cardElement.querySelector(".card__title");
    this._cardLike = this._cardElement.querySelector(".card__like-number");

    this._setEventListeners();
    this._renderLikes();

    if (this._userId != this._ownerId) {
      this._deleteBtn.remove();
    }

    this._cardImgElement.src = this._link;
    this._cardImgElement.alt = this._name;
    this._titleElement.textContent = this._name;
    return this._cardElement;
  }
}
