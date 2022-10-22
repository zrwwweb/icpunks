"use strict";
"use strict";
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var closeModal = document.querySelector('.modal__btn-close');
var modal = document.querySelector('.modal');
var btns = document.querySelectorAll('.btn');
btns.forEach(function (el) {
  el.addEventListener('click', function () {
    modal.classList.add('modal_visible');
    document.querySelector('body').classList.add('stop-scroll');
  });
});
closeModal.addEventListener('click', function () {
  modal.classList.remove('modal_visible');
  document.querySelector('body').classList.remove('stop-scroll');
});
var scrollItems = document.querySelectorAll('.scroll-item');
window.addEventListener('scroll', checkItems);
checkItems();

function checkItems() {
  var triggetBottom = window.innerHeight / 5 * 4;
  scrollItems.forEach(function (item) {
    var itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggetBottom) {
      item.classList.add('animation-class');
    } else {
      item.classList.remove('animation-class');
    }
  });
} // inputmask


var form = document.querySelectorAll('.form');
var telSelector = document.querySelector('.modal__input-tel');
var inputMask = new Inputmask('+6 (777) 999-99-99');
inputMask.mask(telSelector);
var validation = new JustValidate('.form');
validation.addField('.modal__input-name', [{
  rule: 'minLength',
  value: 3,
  errorMessage: 'Name must contain at least 3 letters'
}, {
  rule: 'maxLength',
  value: 30
}, {
  rule: 'required',
  value: true,
  errorMessage: 'Enter your name!'
}]).addField('.modal__input-email', [{
  rule: 'required',
  value: true,
  errorMessage: 'Enter your Email'
}, {
  rule: 'email',
  value: true,
  errorMessage: 'Enter correct Email'
}]).addField('.modal__input-tel', [{
  rule: 'required',
  value: true,
  errorMessage: 'Enter your phone number'
}, {
  rule: 'function',
  validator: function validator() {
    var phone = telSelector.inputmask.unmaskedvalue();
    return phone.length === 10;
  },
  errorMessage: 'Phone number is wrong'
}]).onSuccess(function (event) {
  var _console;

  console.log('Validation passes and form submitted', event);
  var formData = new FormData(event.target);

  (_console = console).log.apply(_console, _toConsumableArray(formData));

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Отправлено');
      }
    }
  };

  xhr.open('POST', 'mail.php', true);
  xhr.send(formData);
  event.target.reset();
});
//# sourceMappingURL=main.js.map
