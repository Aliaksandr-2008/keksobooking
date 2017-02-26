'use strict';

(function () {
  var LOAD_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var keyCodeList = {
    ENTER: 13,
    ESC: 27
  };

  var PIN_SIZE = {
    WIDTH: 56,
    HEIGHT: 75
  };

  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var dialogCloseBtn = document.querySelector('.dialog__close');

  var templateElement = document.getElementById('pin-template');
  var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

  var renderPins = function (item, index) {
    pinMap.appendChild(function () {
      var newPin = templateContainer.querySelector('.pin').cloneNode(true);
      var img = new Image(40, 40);
      img.src = item.author.avatar;

      newPin.style.left = item.location.x - PIN_SIZE.WIDTH / 2 + 'px';
      newPin.style.top = item.location.y - PIN_SIZE.HEIGHT + 'px';
      newPin.setAttribute('data-index', String(index));
      newPin.appendChild(img);
      return newPin;
    });
  };

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

  var pins = document.querySelectorAll('.pin');
  for (var i = 0; i < pins.length; i++) {
    if (!pins[i].classList.contains('pin__main')) {
      pins[i].remove();
    }
  }

  window.load(LOAD_URL, function (data) {
    var similarApartments = JSON.parse(data);
    var filteredApartments = similarApartments.slice(0, 3);

    filteredApartments.foreach(renderPins());
  });

  pinMap.addEventListener('click', pinMapHadler);
  pinMap.addEventListener('keydown', pinMapHadler);
})();
