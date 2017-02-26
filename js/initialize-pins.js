'use strict';

(function () {
  var keyCodeList = {
    ENTER: 13,
    ESC: 27
  };

  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var dialogCloseBtn = document.querySelector('.dialog__close');

  // Активирует элемент на карте, по-которому был клик или нажатие клавиши "Enter"
  /**
    * @param {HTMLDivElement} target
    */
  var activatePin = function (target) {
    if (target.classList.contains('pin') && target !== activePin) {
      target.classList.add('pin--active');
      target.setAttribute('aria-pressed', 'true');
    }
  };

  // Деактивирует активный элемент
  var deactivatePin = function () {
    activePin = pinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', 'false');
    }
  };

  // Условие клика или нажатия клавиши "Enter" на элементе
  /**
    * @param {KeyboardEvent|MouseEvent} evt
    * @return {boolean}
    */
  var enterCondition = function (evt) {
    return evt.type === 'click' || evt.keyCode === keyCodeList.ENTER;
  };

  // Закрывает окно со всеми последствиями
  var dialogClose = function () {
    window.showCard(function () {
      activePin.focus(); /* Устанавливает фокус на активную метку на карте при закрытии окна диалога */
    });
    setDialogHandlers();
    deactivatePin();
  };

  // Обработчик кнокпи закрытия окна диалога
  /**
    * @param {KeyboardEvent|MouseEvent} evt
    */
  var dialogCloseHandler = function (evt) {
    if (enterCondition(evt)) {
      evt.preventDefault();
      dialogClose();
    }
  };

  // Обработчик клавиши "ESC"
  /**
    * @param {KeyboardEvent|MouseEvent} evt
    */
  var escBtnHandler = function (evt) {
    if (evt.keyCode === keyCodeList.ESC) {
      dialogClose(evt);
    }
  };

  // Установщик обработчиков при открытом окне диалога
  /**
    * @param {boolean} condition
    */
  var setDialogHandlers = function (condition) {
    if (condition) {
      dialogCloseBtn.addEventListener('click', dialogCloseHandler);
      window.addEventListener('keydown', escBtnHandler);
    } else {
      dialogCloseBtn.removeEventListener('click', dialogCloseHandler);
      window.removeEventListener('keydown', escBtnHandler);
    }
  };

  // Обработчик событий на карте
  /**
    * @param {KeyboardEvent|MouseEvent} evt
    */
  var pinMapHadler = function (evt) {
    if (enterCondition(evt)) {
      evt.preventDefault();

      var target = evt.target;

      deactivatePin();

      while (target !== pinMap) {
        if (target.classList.contains('pin') && target !== activePin) {
          activatePin(target);
          activePin = pinMap.querySelector('.pin--active');
          window.showCard();
          setDialogHandlers(true);
        } else if (target === activePin) {
          dialogClose();
        }
        target = target.parentNode;
      }
    }
  };

  pinMap.addEventListener('click', pinMapHadler);
  pinMap.addEventListener('keydown', pinMapHadler);
})();
