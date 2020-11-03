"use strict";

(function activate() {
  var form = document.querySelector(".ad-form");
  var formFieldsets = form.querySelectorAll("fieldset");
  var buttonReset = document.querySelector(".ad-form__reset");

  // переключение fieldset

  var switchFieldset = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };

  // функция ДЕактивации страницы

  var deactivatePage = function () {
    document.querySelector(".map").classList.add("map--faded");
    switchFieldset(formFieldsets, true);
    window.removePopups();
    window.loadResult = null;
    window.removePinsBlock();
    window.doStartFilter();
    window.resetMainMark();
    window.addMainMarkListners();
    form.reset();
  };

  // ДЕактивирует при нажатии на мышку

  buttonReset.addEventListener("mousedown", function (evt) {
    if (!evt.button) {
      deactivatePage();

      form.classList.add("ad-form--disabled");
    }
  });

  // ДЕактивирует при нажатии на enter

  buttonReset.addEventListener("keydown", function (evt) {
    if (evt.key === "Enter") {
      deactivatePage();

      form.classList.add("ad-form--disabled");
    }
  });
})();
