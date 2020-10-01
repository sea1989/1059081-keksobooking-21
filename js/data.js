'use strict';

(function activate() {

  var PINS_NUMBER = 8;
  var avatarsnumber = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var comfort = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArr = function (arr) {
    var length = getRandomInRange(0, arr.length);
    var result = [];
    for (var i = 0; i < length; i++) {
      result.push(arr[i]);
    }
    return result;
  };

  var createAdvertsData = function (count) {
    var pinsArray = [];

    for (var i = 0; i < count; i++) {
      var advert = {
        author: {
          avatar: 'img/avatars/user' + avatarsnumber[i] + '.png',
        },

        offer: {
          title: 'заголовок объявления',
          address: '600, 350',
          price: 5200,
          type: 'palace',
          rooms: 2,
          guests: 3,
          checkin: '14:00',
          checkout: '12:00',
          features: getRandomArr(comfort),
          description: 'строка с описанием',
          photos: getRandomArr(photos),
        },
        location: {
          x: getRandomInRange(0, 1200),
          y: getRandomInRange(130, 630),
        },
      };
      pinsArray.push(advert);
    }
    return pinsArray;
  };
  var adverts = createAdvertsData(PINS_NUMBER);

  window.adverts = adverts;

})();
