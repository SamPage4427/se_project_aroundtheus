/*       Imports       */
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../utils/Api.js";
import {
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
  avatarModal,
  avatarEditButton,
  avatarModalCloseBtn,
  avatarModalForm,
} from "../utils/constants.js";

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
  editProfileModal.setSubmitButtonText("Saving...");
  api
    .editUserProfile(input)
    .then((data) => {
      userInfo.setUserInfo(data);
      editProfileModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      editProfileModal.setSubmitButtonText("Save");
    });
});

const cardAddModal = new PopupWithForm(addCardModal, (input) => {
  cardAddModal.setSubmitButtonText("Creating...");
  api
    .addNewCard(input)
    .then((data) => {
      renderCard(data);
      cardAddModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cardAddModal.setSubmitButtonText("Create");
    });
});

const previewModal = new PopupWithImage({
  modalSelector: previewImageModal,
});

const deleteCardModal = new PopupWithConfirm(removeCardModal);

const changeAvatarModal = new PopupWithForm(avatarModal, (input) => {
  changeAvatarModal.setSubmitButtonText("Saving...");
  api
    .editUserAvatar(input.avatar)
    .then((data) => {
      userInfo.setAvatarInfo(data);
      changeAvatarModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeAvatarModal.setSubmitButtonText("Save");
    });
});

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
      deleteCardModal.setSubmitAction(() => {
        deleteCardModal.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardModal.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            deleteCardModal.renderLoading(false, "Yes");
          });
      });
    },
    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLike(cardId)
          .then((data) => card.setLikes(data.likes))
          .catch((err) => console.error(err));
      } else {
        api
          .addCardLike(cardId)
          .then((data) => card.setLikes(data.likes))
          .catch((err) => console.error(err));
      }
    }
  );
  return card.getCardElement();
}

/*      Render Cards      */
function renderCard(data) {
  const card = createCard(data);
  cardApi.prependItem(card);
}

/*       API info      */
api
  .getApiInfo()
  .then(([initializeUser, initializeCards]) => {
    userId = initializeUser._id;
    userInfo.setUserInfo(initializeUser);
    userInfo.setAvatarInfo(initializeUser);

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
  profileFormValidator.resetValidation();
});
addCardBtn.addEventListener("click", () => {
  cardAddModal.open();
  addCardFormValidator.resetValidation();
});

avatarEditButton.addEventListener("click", () => {
  changeAvatarModal.open();
  avatarFormValidator.resetValidation();
});

/*      Close Modal Listeners       */
profileEditModalCloseBtn.addEventListener("click", () =>
  editProfileModal.close()
);

addModalCloseBtn.addEventListener("click", () => cardAddModal.close());

previewImageCloseBtn.addEventListener("click", () => previewModal.close());

deleteCardCloseBtn.addEventListener("click", () => deleteCardModal.close());

avatarModalCloseBtn.addEventListener("click", () => changeAvatarModal.close());

/*     Event Listeners      */
editProfileModal.setEventListeners();
cardAddModal.setEventListeners();
previewModal.setEventListeners();
deleteCardModal.setEventListeners();
changeAvatarModal.setEventListeners();

/*      Form Validators       */
const profileFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarModalForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
