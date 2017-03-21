const onReceivedCharacters = xhr => {
  var response = JSON.parse(xhr.response);
  console.log(response);

  Object.keys(response).forEach(key => {
    createCard(response[key]);
  });
};

const getCharacters = () => {
  const xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getCharacters');
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = () => onReceivedCharacters(xhr);

  xhr.send();
};

const createCard = char => {
  var card = document.createElement('div');
  card.className = 'card';

  // var img = document.createElement('img');
  // img.className = 'headshot';
  // img.src = char.imagepath;
  // card.appendChild(img);

  var info = document.createElement('div');
  info.className = 'info';
  card.appendChild(info);

  var name = document.createElement('div');
  name.className = 'name';
  name.textContent = char.name;
  info.appendChild(name);

  var title = document.createElement('div');
  title.className = 'title';
  title.textContent = char.title;
  info.appendChild(title);

  var container = document.querySelector('.container');
  container.appendChild(card);
};

const init = () => {
  getCharacters();

  const userForm = document.querySelector('#userForm');
  const nameForm = document.querySelector('#nameForm');
};

window.onload = init;
const onReceivedCharacters = xhr => {
  var response = JSON.parse(xhr.response);
  console.log(response);

  Object.keys(response).forEach(key => {
    createCard(response[key]);
  });
};

const getCharacters = () => {
  const xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getCharacters');
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = () => onReceivedCharacters(xhr);

  xhr.send();
};

const createCard = char => {
  var card = document.createElement('div');
  card.className = 'card';

  // var img = document.createElement('img');
  // img.className = 'headshot';
  // img.src = char.imagepath;
  // card.appendChild(img);

  var info = document.createElement('div');
  info.className = 'info';
  card.appendChild(info);

  var name = document.createElement('div');
  name.className = 'name';
  name.textContent = char.name;
  info.appendChild(name);

  var title = document.createElement('div');
  title.className = 'title';
  title.textContent = char.title;
  info.appendChild(title);

  var container = document.querySelector('.container');
  container.appendChild(card);
};

const init = () => {
  getCharacters();

  const userForm = document.querySelector('#userForm');
  const nameForm = document.querySelector('#nameForm');
};

window.onload = init;
