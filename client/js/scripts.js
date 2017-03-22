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
  console.log(xhr.status);

  // clear cards
  const container = document.querySelector('.container');
  container.innerHTML = '';

  Object.keys(response).forEach(key => {
    createCard(response[key]);
  });
};

const getFolios = (major) => {
  const xhr = new XMLHttpRequest();

  const url = '/getFolios';
  const endpoint = major ? `${url}?major=${major}` : url;

  console.log(endpoint);

  xhr.open('GET', endpoint);
  xhr.setRequestHeader ("Accept", 'application/json');

  xhr.onload = () => onReceivedFolios(xhr);

  xhr.send();
};

const handlePostResponse = (xhr, addForm) => {
  console.log(xhr.status);

  switch (xhr.status) {
    case 201:
      hideForm();
      addForm.reset();
      getFolios();
      break;

    case 400:
      const message = JSON.parse(xhr.response).message;
      const errorDiv = document.querySelector('.errorMessage');
      errorDiv.textContent = `Error: ${message}`;
      break;

    default:
      break;
  };
};

const postFolio = (e, addForm) => {
  const name = document.querySelector('#nameField').value;
  const major = document.querySelector('#majorSelect').value;
  const email = document.querySelector('#emailField').value;
  const portfolio = document.querySelector('#portfolioField').value;

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/addFolio');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader ("Accept", 'application/json');

  let formData = `name=${name}&title=${major}&email=${email}&portfolio=${portfolio}`;

  var checkboxes = document.querySelectorAll('.checkboxes input');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      formData += `&${checkbox.name}=on`;
    }
  });

  xhr.onload = () => handlePostResponse(xhr, addForm);

  xhr.send(formData);

  e.preventDefault();
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

const showForm = () => {
  const formContainer = document.querySelector('#addFolio');
  formContainer.className += ' is-shown';
}

const hideForm = () => {
  const formContainer = document.querySelector('#addFolio');
  formContainer.className = 'addFolio';
}

const init = () => {
  getFolios();

  const logo = document.querySelector('.logo');
  const addButton = document.querySelector('#addButton');
  const formContainer = document.querySelector('#addFolio');
  const addForm = document.querySelector('#addFolioForm');

  logo.addEventListener('click', () => {
    getFolios();
  });

  addForm.addEventListener('submit', (e) => {
    postFolio(e, addForm);
  });

  addButton.addEventListener('click', () => {
    showForm();
  });

  document.body.addEventListener('click', (e) => {
    if (!formContainer.contains(e.target) && e.target.id !== 'addButton') {
      hideForm();
    }
  });

  // populate selectors
  const majorSelect = document.querySelector('#majorSelect');
  const filterSelect = document.querySelector('.majorFilter');

  Object.keys(COLORS_MAP).forEach((key) => {
    var majorOption = createElement('option', { value: key, textContent: key });
    majorSelect.appendChild(majorOption);
    filterSelect.appendChild(majorOption.cloneNode(true));
  });

  filterSelect.addEventListener('change', (e) => {
    getFolios(e.target.value);
  });
};

window.onload = init;
