'use strict';

(function activate() {

  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var buttonReset = document.querySelector('.ad-form__reset');
  var addressInput = form.querySelector('#address');
  var mainMark = document.querySelector('.map__pin--main');

  // переключение fieldset

  var switchFieldset = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };

  // функция активации страницы

  var getPageDeactive = function () {
    document.querySelector('.map').classList.add('map--faded');
    switchFieldset(formFieldsets, true);
    addressInput.value = '600, ' + '375';
    
    mainMark.style.top = 375 + 'px';
    mainMark.style.left = 570 + 'px';
    window.removePopups();
  };

  // активирует при нажатии на мышку

  buttonReset.addEventListener('mousedown', function (evt) {
    if (!evt.button) {
      getPageDeactive();

    

      if (!window.loadResult) {
        window.load(window.createPinsBlock);
      }

      form.classList.add('ad-form--disabled');
    }
  });

  // активирует при нажатии на enter

  buttonReset.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      getPageDeactive();

      if (!window.loadResult) {
        window.load(window.createPinsBlock);
      }
      form.classList.add('ad-form--disabled');
    }
  });

})();
