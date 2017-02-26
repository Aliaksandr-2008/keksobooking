'use strict';

(function () {
  var keyCodeList = {
    ENTER: 13,
    ESC: 27
  };

  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin;
  var dialog = document.querySelector('.dialog');

  // Деактивирует активный элемент
  var deactivatePin = function () {
    activePin = pinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', 'false');
      dialog.classList.remove('dialog--active');
    }
  };

  // Активирует элемент на карте, по-которому был клик или нажатие клавиши "Enter"
  var activatePin = function (target) {
    if (target.classList.contains('pin') && target !== activePin) {
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', 'true');
      dialog.classList.add('dialog--active');
    }
  };

  // Обработчик событий на карте
  var pinMapHadler = function (evt) {

    var enterCondition = function (e) {
      if (e.type === 'click' || e.keyCode === keyCodeList.ENTER) {
        return true;
      } else {
        return false;
      }
    };

    if (enterCondition(evt)) {
      evt.preventDefault();

      var target = evt.target;

      deactivatePin();

      while (target !== pinMap) {
        if (target.classList.contains('pin') && target !== activePin) {
          activatePin(target);
        }
        target = target.parentNode;
      }

      // Закрывает окно диалога
      var closeDialogAction = function (e) {
        e.preventDefault();
        dialog.classList.remove('dialog--active');
        dialog.removeEventListener('click', dialogHanler);
        dialog.removeEventListener('keydown', dialogHanler);
        window.removeEventListener('keydown', escBtnHandler);
        deactivatePin();
      };

      // Обработчик клавиши "ESC"
      var escBtnHandler = function (e) {
        if (e.keyCode === keyCodeList.ESC) {
          closeDialogAction(e);
        }
      };

      // Обработчик событий окна
      var dialogHanler = function (e) {
        if (enterCondition(e)) {
          var trgt = e.target;

          while (trgt !== dialog) {
            if (trgt.classList.contains('dialog__close')) {
              closeDialogAction(e);
            }
            trgt = trgt.parentNode;
          }
        }
      };
    }

    dialog.addEventListener('click', dialogHanler);
    window.addEventListener('keydown', escBtnHandler);
  };

  pinMap.addEventListener('click', pinMapHadler);
  pinMap.addEventListener('keydown', pinMapHadler);
})();
