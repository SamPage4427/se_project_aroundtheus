/*       Imports       */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";
import { config } from "./validation.js";

/*      Initial Cards Object      */
const initialCards = [
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

/*      Wrappers      */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#card-add-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#image-modal");

/*      Buttons and DOM elements      */
const profileEditBtn = document.querySelector(".profile__edit");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close");
const addCardBtn = document.querySelector(".profile__add");
const addModalCloseBtn = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewImageCloseBtn = previewImageModal.querySelector(".modal__close");

/*       Form Inputs      */
const modalTitle = document.querySelector("#title-input");
const modalDescription = document.querySelector("#description-input");
const addCardTitle = document.querySelector("#card-title-input");
const addCardDescription = document.querySelector("#url-input");

/*      Render Cards      */
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getCardElement();
  wrapper.prepend(cardElement);
}

/*       Form Submit Functions       */
function fillProfileForm() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitle.value;
  profileDescription.textContent = modalDescription.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitle.value;
  const link = addCardDescription.value;
  renderCard({ name, link }, cardListElement);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
  closeModal(addCardModal);
}

/*      Open Modal Listeners       */
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});
addCardBtn.addEventListener("click", () => openModal(addCardModal));

/*      close Modal Listeners       */
profileEditModalCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));

previewImageCloseBtn.addEventListener("click", () =>
  closeModal(previewImageModal)
);

/*      Form Event Listeners      */
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/*      Form Validators       */
const profileFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*       Create Card       */
function createCard(object) {
  const card = new Card(object, "#card-template");
  return card.getCardElement();
}

/*      Cards intialization       */
initialCards.forEach((cardData) => {
  cardListElement.append(createCard(cardData));
});
