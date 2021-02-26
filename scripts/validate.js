//Функция добавления/показа ошибки//
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //поиск элемента по ID//
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};
//Функция удаления/очищения ошибки//
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //поиск элемента по ID//
  errorElement.textContent = "";
  errorElement.classList.remove(inputErrorClass);
};

const getErrorMessage = (inputElement) => {
  if (inputElement.validity.typeMismatch) {
    return "Введите адрес сайта";
  }
  if (inputElement.validity.valueMissing) {
    return "Вы пропустили это поле";
  }
  return inputElement.validationMessage;
};
//Функция проверки валидности инпута//
const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement); //текст ошибки//
    showInputError(formElement, inputElement, errorMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};
//Функция переключения/активации кнопки//
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Функция установки слушателей для отмены отправки формы на сервер//
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass
) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  //Функция получения массива из NODE листа инпутов//
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evant) => {
      checkInputValidity(formElement, inputElement, inputErrorClass); //вызов функции проверки валидности инпута//
      toggleButtonState(inputList, buttonElement, inactiveButtonClass); //вызов функции переключения/активации кнопки//
    });
  });
};
//Функция получения массива из NODE листа форм//
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass
    );
  });
};
enableValidation({
  formSelector: ".popup__inputs",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__error_active",
});
