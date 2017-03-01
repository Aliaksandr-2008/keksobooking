'use strict';

(function () {
  var PIN_LOAD_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var keyCodeList = {
    ENTER: 13,
    ESC: 27
  };

  var PICTURE_SIZE = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var PIN_SIZE = {
    WIDTH: 56,
    HEIGHT: 75
  };

  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var mainPin = pinMap.querySelector('.pin__main');
  var dialogCloseBtn = document.querySelector('.dialog__close');

  var filteredApartments = null;

  var templateElement = document.getElementById('pin-template');
  var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

  var getPinElement = function (item, index) {
    var pinElement = templateContainer.querySelector('.pin').cloneNode(true);
    var img = pinElement.querySelector('img');
    var picture = new Image(PICTURE_SIZE.WIDTH, PICTURE_SIZE.HEIGHT);
    var imgLoadTimeout = null;

    picture.onload = function (evt) {
      clearTimeout(imgLoadTimeout);
      img.src = evt.target.src;
    };

    picture.src = item.author.avatar;

    imgLoadTimeout = setTimeout(function () {
      img.src = '';
    }, 10000);

    pinElement.style.left = parseInt(item.location.x, 10) - PIN_SIZE.WIDTH / 2 + 'px';
    pinElement.style.top = parseInt(item.location.y, 10) - PIN_SIZE.HEIGHT + 'px';
    pinElement.setAttribute('data-index', index.toString());

    return pinElement;
  };

  var Pin = function (data, index) {
    this.data = data;
    this.element = getPinElement(this.data, index);
  };

  var renderPins = function (obj) {
    obj.forEach(function (item, index) {
      pinMap.appendChild(new Pin(item, index).element);
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
    activePin = pinMap.querySelector('.pin--active');
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
    window.showCard(false, function () {
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
        if (target.classList.contains('pin') && target !== activePin && target !== mainPin) {
          activatePin(target);
          var offerData = filteredApartments[parseInt(target.getAttribute('data-index'), 10)];
          window.showCard(offerData);
          setDialogHandlers(true);
        } else if (target === activePin && target !== mainPin) {
          dialogClose();
        } else if (target === mainPin) {
          activatePin(target);
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

  window.load(PIN_LOAD_URL, function (data) {
    var similarApartments = JSON.parse(data);
    filteredApartments = similarApartments.slice(0, 3);

    renderPins(filteredApartments);
  });

  pinMap.addEventListener('click', pinMapHadler);
  pinMap.addEventListener('keydown', pinMapHadler);
})();
