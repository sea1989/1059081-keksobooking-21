'use strict';

(function activate() {

  var filters = document.querySelector('.map__filters');
  var featuresList = filters.querySelector('#housing-features');

  // история фильтров

  var filterArray = [{
    nameFilter: 'housing-type',
    valueFilter: 'any'
  },
  {
    nameFilter: 'housing-price',
    valueFilter: 'any'
  },
  {
    nameFilter: 'housing-rooms',
    valueFilter: 'any'
  },
  {
    nameFilter: 'housing-guests',
    valueFilter: 'any'
  }
  ];

  var changeArray = function (selectID, newSelectValue) {
    var element = filterArray.find(function (item) {
      return item.nameFilter === selectID;
    });

    var indexElement = filterArray.indexOf(element);

    filterArray.splice(indexElement, 1);

    filterArray.push({
      nameFilter: selectID,
      valueFilter: newSelectValue
    });

  };

  var getGroupByPrice = function(price){

    console.log(price);

    if ((price >= 10000) && (price <= 50000))
    return 'middle';

   else if (price <10000) 
    return 'low';

    else if (price > 50000) 
    return 'high';

    
  }

  var filterData = function () {

    var dataArray = window.loadResult;

    filterArray.forEach(function (object) {
      if (object.nameFilter === 'housing-type' && object.valueFilter !== 'any') {
        dataArray = dataArray.filter(function (item) {
          return item.offer.type === object.valueFilter;
        });
      } else if (object.nameFilter === 'housing-price' && object.valueFilter !== 'any') {
        dataArray = dataArray.filter(function (item) {
          return getGroupByPrice(Number(item.offer.price)) === object.valueFilter;


        });
      } else if (object.nameFilter === 'housing-rooms' && object.valueFilter !== 'any') {
        dataArray = dataArray.filter(function (item) {
          return item.offer.rooms === Number(object.valueFilter);
        });
      } else if (object.nameFilter === 'housing-guests' && object.valueFilter !== 'any') {
        dataArray = dataArray.filter(function (item) {
          return item.offer.guests === Number(object.valueFilter);
        });
      }
    });
    var features = Array.from(featuresList.querySelectorAll('input:checked'));

    function filterByFeatures(data) {
      return features.every(function (feature) {
        return data.offer.features.includes(feature.value);
      });
    }
    dataArray = dataArray.filter(filterByFeatures);

    return dataArray;
  };

  filters.addEventListener('change', window.debounce(function (evt) {

    window.removePinsBlock();
    window.removePopupCard();
    changeArray(evt.target.id, evt.target.value);
    console.log(filterArray);
    window.createPinsBlock(filterData(evt.target.id, evt.target.value));
  }));

})();
