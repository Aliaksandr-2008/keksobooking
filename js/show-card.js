'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');

  /**
   * @param {?Function} callback
   */
  return function (callback) {
    if (callback) {
      dialog.classList.toggle('dialog--active', false);
      dialog.setAttribute('aria-hidden', true);
      callback();
    } else {
      dialog.classList.toggle('dialog--active', true);
      dialog.setAttribute('aria-hidden', false);
    }
  };
})();
