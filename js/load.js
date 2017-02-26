'use strict';

window.load = (function () {

  /**
   * @param {string} url
   * @param {Function} onLoad
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (evt) {
      try {
        onLoad(evt.target.response);
      } catch (err) {
        throw new Error('Fatal error: Invalid data received');
      }
    });

    xhr.addEventListener('error', function (evt) {
      throw new Error(evt.target.status + '. Unable to load pictures');
    });

    xhr.addEventListener('timeout', function () {
      throw new Error('Network error: Server timeout');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);

    xhr.send();
  };
})();
