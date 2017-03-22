'use strict';

var onReceivedCharacters = function onReceivedCharacters(xhr) {
  var response = JSON.parse(xhr.response);
  console.log(response);

  Object.keys(response).forEach(function (key) {
    createCard(response[key]);
  });
};

var getCharacters = function getCharacters() {
  var xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getCharacters');
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = function () {
    return onReceivedCharacters(xhr);
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

  var create = createElement;
  var card = create('div', { className: 'card' }, [create('div', { className: 'graphic' }), create('div', { className: 'info' }, [create('div', { className: 'name', textContent: char.name }), create('div', { className: 'title', textContent: char.title }), create('div', { className: 'interests', textContent: interestText }), create('div', { className: 'contact email', textContent: char.email }), create('a', { className: 'contact portfolio', textContent: char.portfolio, href: char.portfolio })])]);

  container.appendChild(card);
};

var init = function init() {
  getCharacters();

  var userForm = document.querySelector('#userForm');
  var nameForm = document.querySelector('#nameForm');
};

window.onload = init;
