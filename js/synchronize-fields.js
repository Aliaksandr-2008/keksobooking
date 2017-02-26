'use strict';

window.synchronizeFields = (function () {
  /**
   * @param {HTMLSelectElement|HTMLInputElement} primaryElem
   * @param {HTMLSelectElement|HTMLInputElement} dependentElem
   * @param {Array.<string>} primaryValues
   * @param {Array.<string>} dependentValues
   * @param {string} prop
   */
  return function (primaryElem, dependentElem, primaryValues, dependentValues, prop) {
    dependentElem[prop] = dependentValues[primaryValues.indexOf(primaryElem.value)];
  };
})();
