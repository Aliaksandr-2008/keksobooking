'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');

  /**
   * @param {obj} offer
   * @param {?Function} callback
   */
  return function (offer, callback) {
    var lodgeTitle = dialog.querySelector('.lodge__title');
    var lodgeAddress = dialog.querySelector('.lodge__address');
    var lodgePrice = dialog.querySelector('.lodge__price');
    var lodgeType = dialog.querySelector('.lodge__type');
    var lodgeRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
    var lodgeCheckinTime = dialog.querySelector('.lodge__checkin-time');
    var lodgeFeatures = dialog.querySelector('.lodge__features');
    var lodgeDescription = dialog.querySelector('.lodge__description');
    var lodgePhotos = dialog.querySelector('.lodge__photos');

    if (offer) {
      dialog.classList.toggle('dialog--active', true);
      dialog.setAttribute('aria-hidden', false);
      lodgeTitle.innerHTML = offer.title;
      lodgeAddress.innerHTML = offer.address;
    } else {
      dialog.classList.toggle('dialog--active', false);
      dialog.setAttribute('aria-hidden', true);
    }

    if (callback) {
      callback();
    };
  };
})();
