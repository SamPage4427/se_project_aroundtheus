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
  cardListElement,
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

const newUserInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});

const newProfileEditModal = new PopupWithForm(profileEditModal, (input) => {
  newUserInfo.setUserInfo(input.title, input.description);
});

const newAddCardModal = new PopupWithForm(addCardModal, (input) => {
  renderCard({ name: input.name, link: input.link });
});

const newPreviewModal = new PopupWithImage({
  modalSelector: previewImageModal,
});

newPreviewModal.setEventListeners();

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
  newProfileEditModal.open();
});
addCardBtn.addEventListener("click", () => {
  newAddCardModal.open();
  addCardFormValidator.toggleButtonState();
});

/*      close Modal Listeners       */
profileEditModalCloseBtn.addEventListener("click", () =>
  newProfileEditModal.close()
);

addModalCloseBtn.addEventListener("click", () => newAddCardModal.close());

previewImageCloseBtn.addEventListener("click", () => newPreviewModal.close());

/*      Form Event Listeners      */
// profileEditForm.addEventListener("submit", handleProfileFormSubmit);
newProfileEditModal.setEventListeners();
newAddCardModal.setEventListeners();
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/*      Form Validators       */
const profileFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*       Create Card       */
function createCard(object) {
  const card = new Card(object, "#card-template", (name, link) => {
    newPreviewModal.open(name, link);
  });
  return card.getCardElement();
}

/*      Cards intialization       */
// initialCards.forEach((cardData) => {
//   cardListElement.append(createCard(cardData));
// });
