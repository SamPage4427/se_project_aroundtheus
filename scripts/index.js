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

/*       Card Template       */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/*      Escape Keycode      */
const ESC_KEYCODE = 27;

/*      Wrappers      */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#card-add-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageCaption = previewImageModal.querySelector(".modal__caption");

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

/*      Open and Close Functions       */
function openModal(modal) {
  modal.classList.add("modal__opened");
  modal.addEventListener("mousedown", clickRemoteCloseModal);
  document.addEventListener("keydown", escapeCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  modal.removeEventListener("mousedown", clickRemoteCloseModal);
  document.removeEventListener("keydown", escapeCloseModal);
}

/*      Render Cards      */
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/*      Escape and Click functions      */
function clickRemoteCloseModal(e) {
  if (e.target.classList.contains("modal__opened")) {
    closeModal(e.target);
  }
}

function escapeCloseModal(evt) {
  if (evt.which === ESC_KEYCODE) {
    const activeModal = document.querySelector(".modal__opened");
    closeModal(activeModal);
  }
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
  const cardInputList = [...addCardForm.querySelectorAll(".modal__input")];
  const cardCreateButton = addCardForm.querySelector(".modal__button");
  renderCard({ name, link }, cardListElement);
  document.getElementById("add-card-form").reset();
  toggleFormButtonState(cardInputList, cardCreateButton, config);
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

/*      Generate cards      */
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImgElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-button_active")
  );

  cardDeleteBtn.addEventListener("click", () => cardElement.remove(".card"));

  cardImgElement.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewImageCaption.textContent = data.name;
  });

  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  return cardElement;
}

/*      Cards intialization       */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});
