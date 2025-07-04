export { enabledValidation, clearValidation };

const showInputError = (
  validationConfig,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};
const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const disabledSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
const enableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitButton(buttonElement, validationConfig);
  } else {
    enableSubmitButton(buttonElement, validationConfig);
  }
};
function clearValidation(profileForm, validationConfig) {
  const formElement = profileForm.querySelector(validationConfig.formSelector);
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  disabledSubmitButton(buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, formElement, inputElement);
  });
}
function enabledValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}
