"use strict";

(function activate() {
  var DRAG_LIMIT = {
    x: {
      min: 0,
      max: 1200,
    },
    y: {
      min: 100,
      max: 630,
    },
  };
  var MAIN_MARK_DEFAIULT_POS = {
    x: 570,
    y: 375,
  };

  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_ARROW_HEIGHT = 22;
  var widthMap = document.querySelector(".map__pins").offsetWidth;
  var mainMark = document.querySelector(".map__pin--main");
  var form = document.querySelector(".ad-form");
  var addressInput = form.querySelector("#address");

  // функция прописывает в инпут адрес главной метки

  var printCoordinates = function () {
    var pinCoordinatesLeft = Math.round(PIN_WIDTH / 2 + mainMark.offsetLeft);
    var pinCoordinatesTop = Math.round(
      PIN_HEIGHT + PIN_ARROW_HEIGHT + mainMark.offsetTop
    );
    addressInput.value = pinCoordinatesLeft + ", " + pinCoordinatesTop;
  };

  // задаем адрес изначально

  printCoordinates();

  mainMark.addEventListener("mousedown", function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      printCoordinates();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (mainMark.offsetLeft - shift.x < 0) {
        mainMark.style.left = 0 + "px";
      } else if (mainMark.offsetLeft - shift.x > widthMap - PIN_WIDTH) {
        mainMark.style.left = widthMap - PIN_WIDTH + "px";
      } else {
        mainMark.style.left = mainMark.offsetLeft - shift.x + "px";
      }

      if (mainMark.offsetTop - shift.y > DRAG_LIMIT.y.max) {
        mainMark.style.top = DRAG_LIMIT.y.max + "px";
      } else if (mainMark.offsetTop - shift.y < DRAG_LIMIT.y.min) {
        mainMark.style.top = DRAG_LIMIT.y.min + "px";
      } else {
        mainMark.style.top = mainMark.offsetTop - shift.y + "px";
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      printCoordinates();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  window.resetMainMark = () => {
    mainMark.style.top = MAIN_MARK_DEFAIULT_POS.y + "px";
    mainMark.style.left = MAIN_MARK_DEFAIULT_POS.x + "px";
    printCoordinates();
  };
  window.printCoordinates = printCoordinates;
})();
