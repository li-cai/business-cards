const onReceivedCharacters = (xhr) => {
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
  xhr.setRequestHeader ("Accept", 'application/json');

  xhr.onload = () => onReceivedCharacters(xhr);

  xhr.send();
};

function createElement(tagName, attrs = {}, children = []) {
  const parent = document.createElement(tagName);

  Object.keys(attrs).forEach(function(key) {
    const value = attrs[key];
    parent[key] = value;
  });

  children.forEach(function(child) {
    parent.appendChild(child);
  });

  return parent;
}

const createCard = (char) => {
  const container = document.querySelector('.container');

  const interestText = `Interests: ${char.interests.join(', ')}`;

  const create = createElement;
  const card =
    create('div', { className: 'card' }, [
      create('div', { className: 'graphic' }),
      create('div', { className: 'info' }, [
        create('div', { className: 'name', textContent: char.name }),
        create('div', { className: 'title', textContent: char.title }),
        create('div', { className: 'interests', textContent: interestText }),
        create('div', { className: 'contact email', textContent: char.email }),
        create('a', { className: 'contact portfolio', textContent: char.portfolio, href: char.portfolio }),
      ])
    ]);

  container.appendChild(card);
};

const init = () => {
  getCharacters();

  const userForm = document.querySelector('#userForm');
  const nameForm = document.querySelector('#nameForm');
};

window.onload = init;
