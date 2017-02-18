'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin;
  var dialog = document.querySelector('.dialog');

  // Деактивирует активный элемент
  var deactivatePin = function () {
    activePin = pinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      dialog.classList.remove('dialog--active');
    }
  };

  pinMap.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;

    deactivatePin();

    while (target !== pinMap) {
      if (target.classList.contains('pin') && target !== activePin) {
        target.classList.add('pin--active');
        dialog.classList.add('dialog--active');
      }
      target = target.parentNode;
    }

    // Обработчик событий окна
    var dialogHanler = function (e) {
      e.preventDefault();

      var trgt = e.target;

      while (trgt !== dialog) {
        if (trgt.classList.contains('dialog__close')) {
          dialog.classList.remove('dialog--active');
          dialog.removeEventListener('click', dialogHanler);
          deactivatePin();
        }
        trgt = trgt.parentNode;
      }
    };

    dialog.addEventListener('click', dialogHanler);
  });

  var noticeForm = document.querySelector('.notice__form');
  var noticeTitle = noticeForm.querySelector('#title');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeAddress = noticeForm.querySelector('#address');

  // Установка требований к данным, вводимым в поля формы
  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;
  noticePrice.required = true;
  noticePrice.min = 1000;
  noticePrice.max = 1000000;
  noticeAddress.required = true;

  var roomNumber = noticeForm.querySelector('#room_number');
  var guestsLimit = noticeForm.querySelector('#capacity');

  // Устанавливает минимальную цену в зависимости от выбранного типа жилья
  var setMinPrice = function (type) {
    switch (type) {
      case 'Квартира':
        noticePrice.min = 1000;
        break;
      case 'Лачуга':
        noticePrice.min = 0;
        break;
      case 'Дворец':
        noticePrice.min = 10000;
        break;
    }
  };

  // Устанавливает максимальное количество гостей в засисимости от выбранного количества комнат
  var setMaxGuests = function (rooms) {
    switch (rooms) {
      case '1':
        guestsLimit.selectedIndex = 1;
        break;
      case '2':
      case '100':
        guestsLimit.selectedIndex = 0;
        break;
    }
  };

  // Устанавливает минимальное количество комнат в засисимости от выбранного количества гостей
  var setMinRooms = function (guests) {
    if (parseInt(guests, 10) > 1) {
      roomNumber.selectedIndex = 1;
    }
  };

  noticeForm.addEventListener('change', function (evt) {
    var lodgingType = noticeForm.querySelector('#type');
    var checkInTime = noticeForm.querySelector('#time');
    var checkOutTime = noticeForm.querySelector('#timeout');

    switch (evt.target) {
      case checkInTime:
        checkOutTime.selectedIndex = checkInTime.selectedIndex;
        break;
      case checkOutTime:
        checkInTime.selectedIndex = checkOutTime.selectedIndex;
        break;
      case lodgingType:
        setMinPrice(lodgingType.value);
        break;
      case roomNumber:
        setMaxGuests(roomNumber.value);
        break;
      case guestsLimit:
        setMinRooms(guestsLimit.value);
        break;
    }
  }, true);

  setMaxGuests(roomNumber.value);
})();
