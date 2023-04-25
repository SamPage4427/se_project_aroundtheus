/*       Imports       */
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";

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
  removeCardModal,
  deleteCardCloseBtn,
  profileAvatar,
} from "../utils/constants.js";
import Api from "../utils/Api.js";

/*       User Info       */
const userInfo = new UserInfo({
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatar,
});
let userId;

/*       APIs      */
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "c7546df9-ad4c-4c05-9963-4c89159dd0ba",
    "Content-Type": "application/json",
  },
});
let cardApi;

/*       Popups      */
const editProfileModal = new PopupWithForm(profileEditModal, (input) => {
  api
    .editUserProfile(input)
    .then((data) => {
      userInfo.setUserInfo(data);
      editProfileModal.close();
    })
    .catch((err) => console.error(err));
});

const cardAddModal = new PopupWithForm(addCardModal, (input) => {
  api
    .addNewCard(input)
    .then((data) => {
      renderCard(data);
      cardAddModal.close();
    })
    .catch((err) => console.error(err));
});

const previewModal = new PopupWithImage({
  modalSelector: previewImageModal,
});

previewModal.setEventListeners();

const deleteCardModal = new PopupWithConfirm(removeCardModal);

/*       Create Card       */
function createCard(object) {
  const card = new Card(
    object,
    userId,
    "#card-template",
    (name, link) => {
      previewModal.open(name, link);
    },
    (cardId) => {
      deleteCardModal.open();
      deleteCardModal.submitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardModal.close();
          })
          .catch((err) => console.error(err));
      });
    }
  );
  return card.getCardElement();
}

/*      Render Cards      */
function renderCard(cardData) {
  cardSection.prependItem(createCard(cardData));
}

/*       Sections      */
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

/*       API info      */
api
  .getApiInfo()
  .then(([initializeUser, initializeCards]) => {
    userId = initializeUser._id;
    userInfo.setUserInfo(initializeUser);

    cardApi = new Section(
      { item: initializeCards, renderer: renderCard },
      ".cards__list"
    );
    cardApi.renderItems();
  })
  .catch((err) => console.error(err));

/*       Form Submit Functions       */
function fillProfileForm() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

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

deleteCardCloseBtn.addEventListener("click", () => deleteCardModal.close());

/*      Form Event Listeners      */
editProfileModal.setEventListeners();
cardAddModal.setEventListeners();

/*      Form Validators       */
const profileFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
