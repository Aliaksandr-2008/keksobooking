'use strict';

(function () {
  var valueList = {
    PRICE_MIN: 1000,
    PRICE_MAX: 1000000,
    TITLE_LENGTH_MIN: 30,
    TITLE_LENGTH_MAX: 100
  };

  var CHECK_IN_TIME_VALUES = ['12', '13', '14'];
  var CHECK_OUT_TIME_VALUES = ['12', '13', '14'];

  var LODGING_TYPE_VALUES = ['Квартира', 'Лачуга', 'Дворец'];
  var LODGING_TYPE_MIN_PRICES = ['1000', '0', '10000'];

  var ROOMS_QUANTITY = ['1', '2', '100'];
  var GUESTS_QUANTITY = ['0', '3', '3'];

  var noticeForm = document.querySelector('.notice__form');
  var noticeTitle = noticeForm.querySelector('#title');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeAddress = noticeForm.querySelector('#address');

  // Установка требований к данным, вводимым в поля формы
  noticeTitle.required = true;
  noticeTitle.minLength = valueList.TITLE_LENGTH_MIN;
  noticeTitle.maxLength = valueList.TITLE_LENGTH_MAX;
  noticePrice.required = true;
  noticePrice.min = valueList.PRICE_MIN;
  noticePrice.max = valueList.PRICE_MAX;
  noticeAddress.required = true;

  var roomNumber = noticeForm.querySelector('#room_number');
  var guestsLimit = noticeForm.querySelector('#capacity');

  noticeForm.addEventListener('change', function (evt) {
    var lodgingType = noticeForm.querySelector('#type');
    var checkInTime = noticeForm.querySelector('#time');
    var checkOutTime = noticeForm.querySelector('#timeout');

    switch (evt.target) {
      case checkInTime:
        // Устанавливает время выезда в зависимости от выбранного время заезда
        window.synchronizeFields(checkInTime, checkOutTime, CHECK_IN_TIME_VALUES, CHECK_OUT_TIME_VALUES, 'value');
        break;
      case checkOutTime:
        // Устанавливает время заезда в зависимости от выбранного время выезда
        window.synchronizeFields(checkOutTime, checkInTime, CHECK_OUT_TIME_VALUES, CHECK_IN_TIME_VALUES, 'value');
        break;
      case lodgingType:
        // Устанавливает минимальную цену в зависимости от выбранного типа жилья
        window.synchronizeFields(lodgingType, noticePrice, LODGING_TYPE_VALUES, LODGING_TYPE_MIN_PRICES, 'min');
        break;
      case roomNumber:
        // Устанавливает максимальное количество гостей в засисимости от выбранного количества комнат
        window.synchronizeFields(roomNumber, guestsLimit, ROOMS_QUANTITY, GUESTS_QUANTITY, 'value');
        break;
      case guestsLimit:
        // Устанавливает минимальное количество комнат в засисимости от выбранного количества гостей
        if (guestsLimit.value > 0) {
          window.synchronizeFields(guestsLimit, roomNumber, GUESTS_QUANTITY, ROOMS_QUANTITY, 'value');
        }
        break;
    }
  }, true);
  // Устанавливает максимальное количество гостей при загрузке страницы
  window.synchronizeFields(roomNumber, guestsLimit, ROOMS_QUANTITY, GUESTS_QUANTITY, 'value');
})();
