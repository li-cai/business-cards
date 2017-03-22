'use strict';

var NEW_MEDIA = 'New Media Interactive Development (BS)';
var GAME_DEV = 'Game Design and Development (BS)';
var NEW_MEDIA_DESIGN = 'New Media Design (MFA)';
var HCI = 'Human Centered Computing (BS)';

var COLORS_MAP = {};
COLORS_MAP[HCI] = '#C5EFF7';
COLORS_MAP[NEW_MEDIA] = '#FFEB3B';
COLORS_MAP[GAME_DEV] = '#87D37C';
COLORS_MAP[NEW_MEDIA_DESIGN] = '#BE90D4';

var onReceivedFolios = function onReceivedFolios(xhr) {
  var response = JSON.parse(xhr.response);
  console.log(response);

  Object.keys(response).forEach(function (key) {
    createCard(response[key]);
  });
};

var getFolios = function getFolios() {
  var xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getFolios');
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = function () {
    return onReceivedFolios(xhr);
  };

  xhr.send();
};

function createElement(tagName) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var parent = document.createElement(tagName);

  Object.keys(attrs).forEach(function (key) {
    var value = attrs[key];
    parent[key] = value;
  });

  children.forEach(function (child) {
    parent.appendChild(child);
  });

  return parent;
}

var createCard = function createCard(char) {
  var container = document.querySelector('.container');

  var interestText = 'Interests: ' + char.interests.join(', ');
  var cardColor = COLORS_MAP[char.title];

  var create = createElement;
  var card = create('div', { className: 'card', style: 'border-top: 12px solid ' + cardColor }, [create('div', { className: 'graphic', style: 'background-color: ' + cardColor }), create('div', { className: 'info' }, [create('div', { className: 'name', textContent: char.name }), create('div', { className: 'title', textContent: char.title }), create('div', { className: 'interests', textContent: interestText }), create('div', { className: 'contact email', textContent: char.email }), create('a', {
    className: 'contact portfolio',
    textContent: char.portfolio,
    href: char.portfolio,
    target: '_blank'
  })])]);

  container.appendChild(card);
};

var init = function init() {
  getFolios();

  // const userForm = document.querySelector('#userForm');
  // const nameForm = document.querySelector('#nameForm');

  var addButton = document.querySelector('#addButton');
  var formContainer = document.querySelector('#addFolio');

  addButton.addEventListener('click', function () {
    formContainer.className += ' is-shown';
  });

  document.body.addEventListener('click', function (e) {
    if (!formContainer.contains(e.target) && e.target.id !== 'addButton') {
      formContainer.className = 'addFolio';
    }
  });

  var majorSelect = document.querySelector('#majorSelect');
  Object.keys(COLORS_MAP).forEach(function (key) {
    var majorOption = createElement('option', { value: key, textContent: key });
    majorSelect.appendChild(majorOption);
  });
};

window.onload = init;
