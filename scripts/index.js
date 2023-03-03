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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/*-------------------------------------------------------------------------------------*/
/*                                  Wrappers
/*-------------------------------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#card-add-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageCaption = previewImageModal.querySelector(".modal__caption");

/*-------------------------------------------------------------------------------------*/
/*                            Buttons and DOM elements
/*-------------------------------------------------------------------------------------*/

const profileEditBtn = document.querySelector(".profile__edit");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close");
const addCardBtn = document.querySelector(".profile__add");
const addModalCloseBtn = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewImageCloseBtn = previewImageModal.querySelector(".modal__close");

/*-------------------------------------------------------------------------------------*/
/*                                 Form inputs
/*-------------------------------------------------------------------------------------*/

const modalTitle = document.querySelector("#profile-title-input");
const modalDescription = document.querySelector("#profile-title-description");
const addCardTitle = document.querySelector("#add-title-input");
const addCardDescription = document.querySelector("#add-url-description");

/*-------------------------------------------------------------------------------------*/
/*                           open and close functions
/*-------------------------------------------------------------------------------------*/

function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/*-------------------------------------------------------------------------------------*/
/*                             form submit functions
/*-------------------------------------------------------------------------------------*/

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
  closeModal(addCardModal);
}

/*-------------------------------------------------------------------------------------*/
/*                               event listeners
/*-------------------------------------------------------------------------------------*/

profileEditBtn.addEventListener("click", () => {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
});
addCardBtn.addEventListener("click", () => openModal(addCardModal));

profileEditModalCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));

/*-------------------------------------------------------------------------------------*/
/*                             Form Event Listeners
/*-------------------------------------------------------------------------------------*/

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
/*-------------------------------------------------------------------------------------*/
/*                               Generate cards
/*-------------------------------------------------------------------------------------*/

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

  previewImageCloseBtn.addEventListener("click", () =>
    closeModal(previewImageModal)
  );

  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  return cardElement;
}

/*-------------------------------------------------------------------------------------*/
/*                             Cards intialization
/*-------------------------------------------------------------------------------------*/

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});
