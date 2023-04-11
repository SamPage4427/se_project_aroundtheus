/*      Initial Cards Object      */
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*      Config Object       */
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

/*      Wrappers      */
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardModal = document.querySelector("#card-add-modal");
export const addCardForm = addCardModal.querySelector(".modal__form");
export const cardListElement = document.querySelector(".cards__list");
export const previewImageModal = document.querySelector("#image-modal");

/*      Buttons and DOM elements      */
export const profileEditBtn = document.querySelector(".profile__edit");
// const modalCloseBtn = document.querySelector(".modal__close");
export const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close");
export const addCardBtn = document.querySelector(".profile__add");
export const addModalCloseBtn = addCardModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const previewImageCloseBtn =
  previewImageModal.querySelector(".modal__close");

/*       Form Inputs      */
export const modalTitle = document.querySelector("#title-input");
export const modalDescription = document.querySelector("#description-input");
export const addCardTitle = document.querySelector("#card-title-input");
export const addCardDescription = document.querySelector("#url-input");

/*          Keycodes             */
export const ESC_KEYCODE = 27;
