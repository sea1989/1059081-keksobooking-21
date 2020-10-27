'use strict';

(function activate() {

  var FLAT_MIN_PRICE = 1000;
  var BUNGALO_MIN_PRICE = 0;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  // проверяет по комнатам и гостям
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var adType = adForm.querySelector('#type');
  var adPrice = adForm.querySelector('#price');
  var adCheckin = adForm.querySelector('#timein');
  var adCheckout = adForm.querySelector('#timeout');
  var fields = form.querySelectorAll('fieldset');
  var map = document.querySelector('.map');

  var roomAndGuestValidation = function () {
    var roomsValue = parseInt(roomNumber.value, 10);
    if (roomsValue === 1) {
      capacity.value = "1";
      capacity.options[2].disabled = false;
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomsValue === 2) {
      capacity.value = "2";
      capacity.options[0].disabled = true;
      capacity.options[3].disabled = true;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
    } else if (roomsValue === 3) {
      capacity.value = "3";
      capacity.options[3].disabled = true;
      capacity.options[0].disabled = false;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
    } else if (roomsValue === 100) {
      capacity.value = "0";
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[3].disabled = false;
    }
  };

  // валидация на цену по типу жилья

  var onTypeChange = function () {
    switch (adType.value) {
      case 'flat':
        adPrice.min = FLAT_MIN_PRICE;
        adPrice.placeholder = FLAT_MIN_PRICE;
        break;
      case 'bungalo':
        adPrice.min = BUNGALO_MIN_PRICE;
        adPrice.placeholder = BUNGALO_MIN_PRICE;
        break;
      case 'house':
        adPrice.min = HOUSE_MIN_PRICE;
        adPrice.placeholder = HOUSE_MIN_PRICE;
        break;
      case 'palace':
        adPrice.min = PALACE_MIN_PRICE;
        adPrice.placeholder = PALACE_MIN_PRICE;
        break;
    }
  };

  // синхронизация времени

  var checkinAndCheckoutSync = function (select, selectToSync) {
    selectToSync.value = select.value;
  };

  var onCheckinChange = function () {
    checkinAndCheckoutSync(adCheckin, adCheckout);
  };

  var onCheckoutChange = function () {
    checkinAndCheckoutSync(adCheckout, adCheckin);
  };

  function toggleForm() {
    form.classList.toggle('ad-form--disabled');
    fields.forEach(function (field) {
      field.disabled = !field.disabled;
    });
  }

  // удаление пинов

  var removePinsBlock = function () {
    var pinsBlock = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsBlock.forEach(function (item) {
      item.remove();
    });
  };

  // удаление карточек

  var closeCard = function (currentCard) {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    currentCard.remove();
  };

  var removePopupCard = function () {
    var popupCard = map.querySelector('.map__card.popup');
    if (popupCard) {
      closeCard(popupCard);
    }
  };

  // Обнуление формы

  var resetForm = function () {
    adForm.reset();
    toggleForm();
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    removePinsBlock();
    removePopupCard();
    window.loadResult = null;
  };

  adCheckin.addEventListener('change', onCheckinChange);
  adCheckout.addEventListener('change', onCheckoutChange);
  adType.addEventListener('change', onTypeChange);
  roomNumber.addEventListener('change', roomAndGuestValidation);

  var onSuccessUpload = function () {
    window.success.show();
  };

  window.showError = function (error) {
    window.error.show(error);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccessUpload, window.showError);
    resetForm();
  });

  window.removePinsBlock = removePinsBlock;
  window.removePopupCard = removePopupCard;

})();
