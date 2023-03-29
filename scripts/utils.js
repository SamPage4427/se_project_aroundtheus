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

function clickRemoteCloseModal(e) {
  if (e.target.classList.contains("modal__opened")) {
    closeModal(e.target);
  }
}

function escapeCloseModal(evt) {
  const ESC_KEYCODE = 27;
  if (evt.which === ESC_KEYCODE) {
    const activeModal = document.querySelector(".modal__opened");
    closeModal(activeModal);
  }
}

export { openModal, closeModal };
