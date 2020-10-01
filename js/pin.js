'use strict';

(function activate() {

  // отрисовка пинов

  var similarListElement = document.querySelector('.map__pins');
  var similarPinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  var createPinsBlock = function (data) {
    

    var fragment = document.createDocumentFragment();

    data.filter(pin => pin.offer).slice(0, 5).forEach(function (adv) {

      var pinsElement = similarPinTemplate.cloneNode(true);

      pinsElement.querySelector('img').src = adv.author.avatar;
      pinsElement.querySelector('img').alt = adv.offer.title;
      pinsElement.style =
        'left: ' +
        (adv.location.x - 25) +
        'px; top: ' +
        (adv.location.y - 70) +
        'px;';

      pinsElement.addEventListener('click', function (evt) {

        var pinActive = document.querySelector('.map__pin--active');

        if(pinActive){pinActive.classList.remove('map__pin--active');
      }
        
        pinsElement.classList.add('map__pin--active');

        if (!evt.button) {
          window.createCardAdverts(adv);
        }
      });

      fragment.appendChild(pinsElement);
    });

    similarListElement.appendChild(fragment);

  };

  window.createPinsBlock = createPinsBlock;

})();
