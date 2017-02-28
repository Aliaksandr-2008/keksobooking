'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');

  /**
   * @param {obj} offer
   * @param {?Function} callback
   */
  return function (offerData, callback) {
    var userAvatar = dialog.querySelector('.dialog__title img');
    var lodgeTitle = dialog.querySelector('.lodge__title');
    var lodgeAddress = dialog.querySelector('.lodge__address');
    var lodgePrice = dialog.querySelector('.lodge__price');
    var lodgeType = dialog.querySelector('.lodge__type');
    var lodgeRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
    var lodgeCheckinTime = dialog.querySelector('.lodge__checkin-time');
    var lodgeFeatures = dialog.querySelector('.lodge__features');
    var lodgeDescription = dialog.querySelector('.lodge__description');
    var lodgePhotosContainer = dialog.querySelector('.lodge__photos');


    var lodgeTypeTanslate = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Сарай'
    };

    var rooms = function (arg) {
      var num = arg.toString();
      var lastNum = parseInt(num[num.length - 1], 10)
      if (lastNum === 1) {
        return num + ' комната';
      } else if (lastNum >= 2 && lastNum <= 4) {
        return num + ' комнаты';
      } else if (parseInt(arg) !== 0) {
        return num + ' комнат';
      } else {
        return 'нет комнат для гостей';
      }
    };

    var guests = function (arg) {
      var num = arg.toString();
      var lastNum = parseInt(num[num.length - 1], 10)
      if (lastNum === 1) {
        return ' для ' + num + ' гостя';
      } else  if (parseInt(arg) !== 0) {
        return ' для ' + num + ' гостей';
      } else {
        return '';
      }
    };;

    if (offerData) {
      dialog.classList.toggle('dialog--active', true);
      dialog.setAttribute('aria-hidden', false);
      userAvatar.src = offerData.author.avatar;
      lodgeTitle.innerHTML = offerData.offer.title;
      lodgeAddress.innerHTML = offerData.offer.address;
      lodgePrice.innerHTML = parseInt(offerData.offer.price, 10) + '&#8381;/ночь';
      lodgeType.innerHTML = lodgeTypeTanslate[offerData.offer.type.toString()];
      lodgeRoomsAndGuests.innerHTML = rooms(offerData.offer.rooms) + guests(offerData.offer.guests);
      lodgeCheckinTime.innerHTML = 'заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
      lodgeFeatures.innerHTML = '';

      if (offerData.offer.features.length !== 0) {
        offerData.offer.features.forEach(function (item) {
          var featuresItem = document.createElement('span');
          lodgeFeatures.appendChild(featuresItem).classList.add('feature__image', 'feature__image--' + item);
        });
      }
      lodgeDescription.innerHTML = offerData.offer.description;

      lodgePhotosContainer.innerHTML = '';
      if (offerData.offer.photos.length !== 0) {
        offerData.offer.photos.forEach(function (itemSRC) {
          var photo = new Image();
          photo.src = itemSRC;
          lodgePhotosContainer.appendChild(photo).setAttribute('height', '42');
        });
      }
    } else {
      dialog.classList.toggle('dialog--active', false);
      dialog.setAttribute('aria-hidden', true);
    }

    if (callback) {
      callback();
    };
  };
})();
