"use strict";

(function () {
  var ESC_KEY = "Escape";
  var main = document.querySelector("main");
  var successTemplate = document
    .querySelector("#success")
    .content.querySelector(".success");

  var createSuccessPopup = function () {
    var successPopup = successTemplate.cloneNode(true);
    var successMessage = successPopup.querySelector(".success__message");

    successPopup.addEventListener("click", function (evt) {
      if (evt.target !== successMessage) {
        successPopup.remove();
        document.removeEventListener("keydown", onEscKeydown);
      }
    });

    var onEscKeydown = function (evt) {
      if (evt.key === ESC_KEY) {
        successPopup.remove();
        document.removeEventListener("keydown", onEscKeydown);
      }
    };

    document.addEventListener("keydown", onEscKeydown);

    return successPopup;
  };

  var showSuccessPopup = function (successText) {
    main.appendChild(createSuccessPopup(successText));
  };

  window.success = {
    show: showSuccessPopup,
  };
})();
