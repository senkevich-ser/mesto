//Функция добавления/показа ошибки//
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //поиск элемента по ID//
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};
//Функция удаления/очищения ошибки//
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //поиск элемента по ID//
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_active");
};

//Функция проверки валидности инпута//
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage; //текст ошибки//
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
//Функция переключения/активации кнопки//
const toggleButtonState = (inputList, buttonElement) => {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasNotValidInput) {
    buttonElement;
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-btn_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit-btn_disabled");
  }
};

//Функция установки слушателей для отмены отправки формы на сервер//
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector
) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  //Функция получения массива из NODE листа инпутов//
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evant) => {
      checkInputValidity(formElement, inputElement); //вызов функции проверки валидности инпута//
      toggleButtonState(inputList, buttonElement); //вызов функции переключения/активации кнопки//
    });
  });
};
//Функция получения массива из NODE листа форм//
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector);
  });
};
enableValidation({
  formSelector: ".popup__inputs",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-btn",
});
