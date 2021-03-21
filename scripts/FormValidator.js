export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = this._formElement.querySelectorAll(
      this._config.inputSelector
    );
  }
  //метод добавления/показа ошибки//
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ); //поиск элемента по ID//
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorClass);
  }
  //метод удаления/очищения ошибки//
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ); //поиск элемента по ID//
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.inputErrorClass);
  }
  //метод добавления кастомного текста//
  _getErrorMessage(inputElement) {
    if (inputElement.validity.typeMismatch) {
      return "Введите адрес сайта";
    }
    if (inputElement.validity.valueMissing) {
      return "Вы пропустили это поле";
    }
    return inputElement.validationMessage;
  }
  //метод проверки валидности инпута//
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement); //текст ошибки//
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //метод переключения/активации кнопки//

  _setButtonState(isActiv) {
    if (isActiv) {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evant) => {
        this._checkInputValidity(inputElement); //вызов функции проверки валидности инпута//
        this._setButtonState(this._formElement.checkValidity()); //вызов функции переключения/активации кнопки//
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
