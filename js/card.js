'use strict';

(function activate() {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var similarCardElement = document.querySelector('.map');

  var similarCardTemplate = document
    .querySelector('#card')
    .content.querySelector('.map__card');

  var typeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var renderPhoto = function (photo) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = photo;
    photoItem.width = 45;
    photoItem.height = 40;

    return photoItem;
  };

  // клонирует изображения
  var getPhotos = function (features) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      photosFragment.appendChild(renderPhoto(features[i]));
    }
    return photosFragment;
  };

  var checkPopup = function () {
    var popup = document.querySelectorAll('.popup');
    return popup.length === 0 ? false : true;
  };

  var removePopups = function () {
    if (checkPopup()) {
      var popup = document.querySelector('.popup');
      popup.remove();

    }
  };

  window.removePopups = removePopups;

  // клонирует преимущества
  var generateFeatures = function (photos) {
    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {

      var featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature');
      var featureSpecialClass = 'popup__feature--' + photos[i];
      featuresItem.classList.add(featureSpecialClass);
      featuresFragment.appendChild(featuresItem);
    }
    return featuresFragment;
  };

  var createCardAdverts = function (data) {

    removePopups();

    var cardElement = similarCardTemplate.cloneNode(true);
    var cardCloseButton = cardElement.querySelector('.popup__close');
    var blocksImg = cardElement.querySelectorAll('.popup__photo');

    for (var i = 0; i < blocksImg.length; i++) {
      blocksImg[i].remove();
    }

    var blocks = cardElement.querySelectorAll('.popup__feature');
    for (var j = 0; j < blocks.length; j++) {
      blocks[j].remove();
    }

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent =
      data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent =
      data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeMap[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent =
      data.offer.description;

if(data.offer.features.length === 0){
  cardElement.querySelector('.popup__features').remove();
}else{
  cardElement
      .querySelector('.popup__features')
      .appendChild(generateFeatures(data.offer.features));
};

if(data.offer.photos.length === 0){
  cardElement.querySelector('.popup__photos').remove();
}else{
    cardElement
      .querySelector('.popup__photos')
      .appendChild(getPhotos(data.offer.photos));

};

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    cardCloseButton.addEventListener('click', function () {
      cardElement.remove();
      document.removeEventListener('keydown', onEscKeydown);
    });

    cardCloseButton.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        cardElement.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    var onEscKeydown = function (evt) {
      if (evt.key === ESC_KEY) {
        cardElement.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    document.addEventListener('keydown', onEscKeydown);

    similarCardElement.insertBefore(
        cardElement,
        document.querySelector('.map__filters-container')
    );
  };

  window.createCardAdverts = createCardAdverts;

})();
