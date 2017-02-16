'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var deactivatePin = function () {
    var activePin = pinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  };

  pinMap.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;
    var dialog = document.querySelector('.dialog');

    deactivatePin();

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        target.classList.add('pin--active');
        dialog.classList.add('dialog--active');
      }
      target = target.parentNode;
    }

    var dialogHanler = function (e) {
      e.preventDefault();

      var trgt = e.target;

      while (trgt !== dialog) {
        if (trgt.classList.contains('dialog__close')) {
          dialog.classList.remove('dialog--active');
          deactivatePin();
        }
        trgt = trgt.parentNode;
      }
      dialog.removeEventListener('click', dialogHanler);
    };

    dialog.addEventListener('click', dialogHanler);
  });

  var noticeForm = document.querySelector('.notice__form');
  var noticeTitle = noticeForm.querySelector('#title');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeAddress = noticeForm.querySelector('#address');

  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;

  noticePrice.required = true;
  noticePrice.min = 1000;
  noticePrice.max = 1000000;

  noticeAddress.required = true;

  var roomNumber = noticeForm.querySelector('#room_number');
  var guestsLimit = noticeForm.querySelector('#capacity');

  var setMinPrice = function (type) {
    switch (type) {
      case 'Квартира': {
        noticePrice.min = 1000;
        break;
      }
      case 'Лачуга': {
        noticePrice.min = 0;
        break;
      }
      case 'Дворец': {
        noticePrice.min = 10000;
        break;
      }
    }
  };

  var setGuestsMax = function (rooms) {
    switch (rooms) {
      case '1': {
        guestsLimit.selectedIndex = 1;
        break;
      }
      case '2' || '100': {
        guestsLimit.selectedIndex = 0;
        break;
      }
    }
  };

  noticeForm.addEventListener('change', function (evt) {
    var lodgingType = noticeForm.querySelector('#type');
    var checkInTime = noticeForm.querySelector('#time');
    var checkOutTime = noticeForm.querySelector('#timeout');

    switch (evt.target) {
      case checkInTime: {
        checkOutTime.selectedIndex = checkInTime.selectedIndex;
        break;
      }
      case checkOutTime: {
        checkInTime.selectedIndex = checkOutTime.selectedIndex;
        break;
      }
      case lodgingType: {
        setMinPrice(lodgingType.value);
        break;
      }
      case roomNumber: {
        setGuestsMax(roomNumber.value);
        break;
      }
    }
  }, true);

  setGuestsMax(roomNumber.value);
})();
