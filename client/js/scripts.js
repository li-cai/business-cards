const NEW_MEDIA = 'New Media Interactive Development (BS)';
const GAME_DEV = 'Game Design and Development (BS)';
const NEW_MEDIA_DESIGN = 'New Media Design (MFA)';
const HCI = 'Human Centered Computing (BS)';

const COLORS_MAP = {};
COLORS_MAP[HCI] = '#C5EFF7';
COLORS_MAP[NEW_MEDIA] = '#FFEB3B';
COLORS_MAP[GAME_DEV] = '#87D37C';
COLORS_MAP[NEW_MEDIA_DESIGN] = '#BE90D4';

const onReceivedFolios = (xhr) => {
  var response = JSON.parse(xhr.response);
  console.log(response);

  Object.keys(response).forEach(key => {
    createCard(response[key]);
  });
};

const getFolios = () => {
  const xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getFolios');
  xhr.setRequestHeader ("Accept", 'application/json');

  xhr.onload = () => onReceivedFolios(xhr);

  xhr.send();
};

function createElement(tagName, attrs = {}, children = []) {
  const parent = document.createElement(tagName);

  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    parent[key] = value;
  });

  children.forEach((child) => {
    parent.appendChild(child);
  });

  return parent;
}

const createCard = (char) => {
  const container = document.querySelector('.container');

  const interestText = `Interests: ${char.interests.join(', ')}`;
  const cardColor = COLORS_MAP[char.title];

  const create = createElement;
  const card =
    create('div', { className: 'card', style: `border-top: 12px solid ${cardColor}` }, [
      create('div', { className: 'graphic', style: `background-color: ${cardColor}` }),
      create('div', { className: 'info' }, [
        create('div', { className: 'name', textContent: char.name }),
        create('div', { className: 'title', textContent: char.title }),
        create('div', { className: 'interests', textContent: interestText }),
        create('div', { className: 'contact email', textContent: char.email }),
        create('a', {
          className: 'contact portfolio',
          textContent: char.portfolio,
          href: char.portfolio,
          target: '_blank'
        }),
      ])
    ]);

  container.appendChild(card);
};

const init = () => {
  getFolios();

  // const userForm = document.querySelector('#userForm');
  // const nameForm = document.querySelector('#nameForm');

  const addButton = document.querySelector('#addButton');
  const formContainer = document.querySelector('#addFolio');

  addButton.addEventListener('click', () => {
    formContainer.className += ' is-shown';
  });

  document.body.addEventListener('click', (e) => {
    if (!formContainer.contains(e.target) && e.target.id !== 'addButton') {
      formContainer.className = 'addFolio';
    }
  });

  const majorSelect = document.querySelector('#majorSelect');
  Object.keys(COLORS_MAP).forEach((key) => {
    var majorOption = createElement('option', { value: key, textContent: key });
    majorSelect.appendChild(majorOption);
  });
};

window.onload = init;
