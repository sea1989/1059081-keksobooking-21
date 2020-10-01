'use strict';

(function activate() {

  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mainMark = document.querySelector('.map__pin--main');

  // переключение fieldset

  var switchFieldset = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };

  switchFieldset(formFieldsets, true);

  // функция активации страницы

  var getPageActive = function () {
    document.querySelector('.map').classList.remove('map--faded');
    switchFieldset(formFieldsets, false);
  };

  // активирует при нажатии на мышку

  mainMark.addEventListener('mousedown', function (evt) {
    if (!evt.button) {
      getPageActive();

      if (!window.loadResult) {
        window.load(window.createPinsBlock);
      }

      form.classList.remove('ad-form--disabled');
    }
  });

  // активирует при нажатии на enter

  mainMark.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      getPageActive();

      if (!window.loadResult) {
        window.load(window.createPinsBlock);
      }
      form.classList.remove('ad-form--disabled');
    }
  });

})();
