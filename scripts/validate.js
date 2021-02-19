//Функция деактивации кнопки "Сохранить/Создать" //
function setSubmitButtonState(isFormValid, saveButton) {
  if (isFormValid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__submit-btn_disabled");
  } else {
    saveButton.setAttribute("disabled", true);
    saveButton.classList.add("popup__submit-btn_disabled");
  }
}
//Слушатель на валидность формы РП//
formEditing.addEventListener("input", function (evt) {
  const isActual =
    inputName.value.length > 0 &&
    inputExplorer.value.length > 0 &&
    inputName.validity.valid &&
    inputExplorer.validity.valid;
  setSubmitButtonState(isActual, submitButton);
});
//Слушатель на валидность формы ДК//
formAdding.addEventListener("input", function (evt) {
  const isActualCard =
    inputPlace.value.length > 0 &&
    inputFoto.value.length > 0 &&
    inputPlace.validity.valid &&
    inputFoto.validity.valid;
  setSubmitButtonState(isActualCard, submitButtonCard);
});

//ПЕРЕМЕННЫЕ ФОРМЫ И ПОЛЯ ВВОДА//
const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");

// Функция, которая добавляет класс с ошибкой//
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};

// Функция, которая удаляет класс с ошибкой//
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("popup__error_active");
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля//
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
// Функция isValid на каждый ввод символа//
formInput.addEventListener("input", isValid);

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
    });
  });
};

//Переменная NODE листа всех форм//
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
