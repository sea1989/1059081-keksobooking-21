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

  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    switchFieldset(formFieldsets, false);
  };

  // активирует при нажатии на мышку

  var onMainMouseDown = function (evt) {
    if (!evt.button) {
      activatePage();

      if (!window.loadResult) {
        window.load(window.createPinsBlock, window.showError);
      }

      form.classList.remove('ad-form--disabled');

      mainMark.removeEventListener('mousedown', onMainMouseDown);
      mainMark.removeEventListener('keydown', onMainKeyDown);
    }
  };

  // активирует при нажатии на enter

  var onMainKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();

      if (!window.loadResult) {
        window.load(window.createPinsBlock, window.showError);
      }
      form.classList.remove('ad-form--disabled');
      mainMark.removeEventListener('mousedown', onMainMouseDown);
      mainMark.removeEventListener('keydown', onMainKeyDown);
    }
  };

  window.addMainMarkListners = () => {
    mainMark.addEventListener('keydown', onMainKeyDown);
    mainMark.addEventListener('mousedown', onMainMouseDown);
  };

  window.addMainMarkListners();
})();
