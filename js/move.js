'use strict';

(function activate() {

  var PIN_TIP_HEIGHT = 22;
  var DRAG_LIMIT = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mainMark = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');

  // задаем адрес изначально

  addressInput.value = '600, ' + '375';

  // функция прописывает в инпут адрес главной метки

  var printCoordinates = function () {
    var pinCoordinatesLeft = Math.round(
        parseInt(mainMark.style.left, 10) + PIN_WIDTH / 2
    );
    var pinCoordinatesTop = Math.round(
        parseInt(mainMark.style.top, 10) + PIN_HEIGHT / 2
    );
    addressInput.value = pinCoordinatesLeft + ', ' + pinCoordinatesTop;
  };

  mainMark.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    printCoordinates();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      printCoordinates();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMark.style.top = (mainMark.offsetTop - shift.y) + 'px';
      mainMark.style.left = (mainMark.offsetLeft - shift.x) + 'px';

      // X limit
      if (mainMark.offsetLeft > DRAG_LIMIT.x.max - mainMark.offsetWidth / 2) {
        mainMark.style.left = DRAG_LIMIT.x.max - mainMark.offsetWidth / 2 + 'px';
      } else if (mainMark.offsetLeft < DRAG_LIMIT.x.min - mainMark.offsetWidth / 2) {
        mainMark.style.left = DRAG_LIMIT.x.min - mainMark.offsetWidth / 2 + 'px';
      }

      // Y limit
      if (mainMark.offsetTop > DRAG_LIMIT.y.max - mainMark.offsetHeight - PIN_TIP_HEIGHT) {
        mainMark.style.top = DRAG_LIMIT.y.max - mainMark.offsetHeight - PIN_TIP_HEIGHT + 'px';
      } else if (mainMark.offsetTop < DRAG_LIMIT.y.min - mainMark.offsetHeight - PIN_TIP_HEIGHT) {
        mainMark.style.top = DRAG_LIMIT.y.min - mainMark.offsetHeight - PIN_TIP_HEIGHT + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      printCoordinates();

      mainMark.removeEventListener('mousemove', onMouseMove);
      mainMark.removeEventListener('mouseup', onMouseUp);
    };


    mainMark.addEventListener('mousemove', onMouseMove);
    mainMark.addEventListener('mouseup', onMouseUp);

  });

})();
