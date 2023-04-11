/*       Imports       */
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { openModal, closeModal } from "../utils/utils.js";
import {
  initialCards,
  config,
  profileEditModal,
  profileEditForm,
  addCardModal,
  addCardForm,
  profileEditBtn,
  profileEditModalCloseBtn,
  addCardBtn,
  addModalCloseBtn,
  previewImageModal,
  previewImageCloseBtn,
  modalTitle,
  modalDescription,
  profileTitle,
  profileDescription,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

/*       Class Instances       */
const cardSection = new Section(
  {
    item: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});

const editProfileModal = new PopupWithForm(profileEditModal, (input) => {
  userInfo.setUserInfo(input.title, input.description);
});

const cardAddModal = new PopupWithForm(addCardModal, (input) => {
  renderCard({ name: input.name, link: input.link });
});

const previewModal = new PopupWithImage({
  modalSelector: previewImageModal,
});

previewModal.setEventListeners();

/*      Render Cards      */
function renderCard(cardData) {
  cardSection.prependItem(createCard(cardData));
}

/*       Form Submit Functions       */
function fillProfileForm() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

// function handleProfileFormSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = modalTitle.value;
//   profileDescription.textContent = modalDescription.value;
//   closeModal(profileEditModal);
// }

// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = addCardTitle.value;
//   const link = addCardDescription.value;
//   renderCard({ name, link }, cardListElement);
//   addCardForm.reset();
//   addCardFormValidator.toggleButtonState();
//   closeModal(addCardModal);
// }

/*      Open Modal Listeners       */
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  editProfileModal.open();
});
addCardBtn.addEventListener("click", () => {
  cardAddModal.open();
  addCardFormValidator.toggleButtonState();
});

/*      close Modal Listeners       */
profileEditModalCloseBtn.addEventListener("click", () =>
  editProfileModal.close()
);

addModalCloseBtn.addEventListener("click", () => cardAddModal.close());

previewImageCloseBtn.addEventListener("click", () => previewModal.close());

/*      Form Event Listeners      */
// profileEditForm.addEventListener("submit", handleProfileFormSubmit);
editProfileModal.setEventListeners();
cardAddModal.setEventListeners();
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/*      Form Validators       */
const profileFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*       Create Card       */
function createCard(object) {
  const card = new Card(object, "#card-template", (name, link) => {
    previewModal.open(name, link);
  });
  return card.getCardElement();
}

/*      Cards intialization       */
// initialCards.forEach((cardData) => {
//   cardListElement.append(createCard(cardData));
// });
