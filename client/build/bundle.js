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
  console.log(xhr.status);

  // clear cards
  var container = document.querySelector('.container');
  container.innerHTML = '';

  Object.keys(response).forEach(function (key) {
    createCard(response[key]);
  });
};

var getFolios = function getFolios(major) {
  var xhr = new XMLHttpRequest();

  var url = '/getFolios';
  var endpoint = major ? url + '?major=' + major : url;

  console.log(endpoint);

  xhr.open('GET', endpoint);
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = function () {
    return onReceivedFolios(xhr);
  };

  xhr.send();
};

var handlePostResponse = function handlePostResponse(xhr, addForm) {
  console.log(xhr.status);

  switch (xhr.status) {
    case 201:
      hideForm();
      addForm.reset();
      getFolios();
      break;

    case 400:
      var message = JSON.parse(xhr.response).message;
      var errorDiv = document.querySelector('.errorMessage');
      errorDiv.textContent = 'Error: ' + message;
      break;

    default:
      break;
  };
};

var postFolio = function postFolio(e, addForm) {
  var name = document.querySelector('#nameField').value;
  var major = document.querySelector('#majorSelect').value;
  var email = document.querySelector('#emailField').value;
  var portfolio = document.querySelector('#portfolioField').value;

  var xhr = new XMLHttpRequest();

  xhr.open('POST', '/addFolio');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader("Accept", 'application/json');

  var formData = 'name=' + name + '&title=' + major + '&email=' + email + '&portfolio=' + portfolio;

  var checkboxes = document.querySelectorAll('.checkboxes input');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      formData += '&' + checkbox.name + '=on';
    }
  });

  xhr.onload = function () {
    return handlePostResponse(xhr, addForm);
  };

  xhr.send(formData);

  e.preventDefault();
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

var showForm = function showForm() {
  var formContainer = document.querySelector('#addFolio');
  formContainer.className += ' is-shown';
};

var hideForm = function hideForm() {
  var formContainer = document.querySelector('#addFolio');
  formContainer.className = 'addFolio';
};

var init = function init() {
  getFolios();

  var logo = document.querySelector('.logo');
  var addButton = document.querySelector('#addButton');
  var formContainer = document.querySelector('#addFolio');
  var addForm = document.querySelector('#addFolioForm');

  logo.addEventListener('click', function () {
    getFolios();
  });

  addForm.addEventListener('submit', function (e) {
    postFolio(e, addForm);
  });

  addButton.addEventListener('click', function () {
    showForm();
  });

  document.body.addEventListener('click', function (e) {
    if (!formContainer.contains(e.target) && e.target.id !== 'addButton') {
      hideForm();
    }
  });

  // populate selectors
  var majorSelect = document.querySelector('#majorSelect');
  var filterSelect = document.querySelector('.majorFilter');

  Object.keys(COLORS_MAP).forEach(function (key) {
    var majorOption = createElement('option', { value: key, textContent: key });
    majorSelect.appendChild(majorOption);
    filterSelect.appendChild(majorOption.cloneNode(true));
  });

  filterSelect.addEventListener('change', function (e) {
    getFolios(e.target.value);
  });
};

window.onload = init;
