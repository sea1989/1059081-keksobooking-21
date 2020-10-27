'use strict';

(function activate() {

  var filters = document.querySelector('.map__filters');
  var featuresList = filters.querySelector('#housing-features');
  var filtersAll = document.querySelectorAll('.map__filters');

  // история фильтров

  var filtersHistory = [{
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
    var indexElement = filtersHistory.findIndex(function (item) {
      return item.nameFilter === selectID;
    });

    filtersHistory.splice(indexElement, 1);

    filtersHistory.push({
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

  const doStartFilter = () => {
console.log(filtersHistory)
    filtersHistory.forEach((element)=>{
      element.valueFilter = 'any';
    })

    filtersAll.forEach((element)=>{
      element.reset();
    })

    console.log(filtersHistory);
  };



  var filterData = function () {

    var data = window.loadResult;

    filtersHistory.forEach(function (object) {
      if (object.nameFilter === 'housing-type' && object.valueFilter !== 'any') {
        data = data.filter(function (item) {
          return item.offer.type === object.valueFilter;
        });
      } else if (object.nameFilter === 'housing-price' && object.valueFilter !== 'any') {
        data = data.filter(function (item) {
          return getGroupByPrice(Number(item.offer.price)) === object.valueFilter;


        });
      } else if (object.nameFilter === 'housing-rooms' && object.valueFilter !== 'any') {
        data = data.filter(function (item) {
          return item.offer.rooms === Number(object.valueFilter);
        });
      } else if (object.nameFilter === 'housing-guests' && object.valueFilter !== 'any') {
        data = data.filter(function (item) {
          return item.offer.guests === Number(object.valueFilter);
        });
      }
    });
    var features = Array.from(featuresList.querySelectorAll('input:checked'));

    function filterByFeatures(dataToFilter) {
      return features.every(function (feature) {
        return dataToFilter.offer.features.includes(feature.value);
      });
    }
    data = data.filter(filterByFeatures);

    return data;
  };

  filters.addEventListener('change', window.debounce(function (evt) {

    window.removePinsBlock();
    window.removePopupCard();
    changeArray(evt.target.id, evt.target.value);
    console.log(filtersHistory);
    window.createPinsBlock(filterData(evt.target.id, evt.target.value));
  }));

window.doStartFilter = doStartFilter;

})();
