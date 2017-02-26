'use strict';

window.synchronizeFields = (function () {
  /**
    * @param {HTMLSelectElement|HTMLInputElement} primaryElem
    * @param {HTMLSelectElement|HTMLInputElement} dependentElem
    * @param {Array.<string>} primaryValues
    * @param {Array.<string>} dependentValues
    * @param {Function} callback
    */
  return function (primaryElem, dependentElem, primaryValues, dependentValues, callback) {
    callback(dependentElem, dependentValues[primaryValues.indexOf(primaryElem.value)]);
  };
})();
