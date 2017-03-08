const handleResponse = (xhr, parseResponse) => {
  const content = document.querySelector('#content');

  console.log(xhr.getResponseHeader('etag'));

  console.log(xhr.status);

  switch(xhr.status) {
    case 200: //if success
      content.innerHTML = `<b>Success</b>`;

      if (xhr.response) {
        let users = JSON.parse(xhr.response).users;
        content.innerHTML += `<p>${JSON.stringify(users)}</p>`;
      }
      break;
    case 201: //if created
      content.innerHTML =
        `<b>Create</b><p>Message: ${JSON.parse(xhr.response).message}</p>`;
      break;
    case 204:
      content.innerHTML = '<b>Updated (No Content)</b>';
      break;
    case 304: //if not modified
      content.innerHTML = '<b>Not Modified</b>';
      break;
    case 400: //if bad request
      content.innerHTML =
        `<b>Bad Request</b><p>Message: ${JSON.parse(xhr.response).message}</p>`;
      break;
    case 404: //if not found
      content.innerHTML = `<b>Resource Not Found</b>`;

      if (xhr.response) {
        let message = JSON.parse(xhr.response).message;
        content.innerHTML += `<p>Message: ${message}</p>`;
      }
      break;
    default: //any other status
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  if (parseResponse) {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
  } else {
    console.log('received');
  }
};

const requestUpdate = (e, userForm) => {
  const url = userForm.querySelector('#urlField').value;
  const method = userForm.querySelector('#methodSelect').value;

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');

  if (method == 'get') {
    xhr.onload = () => handleResponse(xhr, true);
  } else {
    xhr.onload = () => handleResponse(xhr, false);
  }

  xhr.send();

  e.preventDefault();
  return !true;
};

const sendPost = (e, nameForm) => {
  const url = nameForm.getAttribute('action');
  const method = nameForm.getAttribute('method');

  const nameField = nameForm.querySelector('#nameField');
  const ageField = nameForm.querySelector('#ageField');

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = () => handleResponse(xhr);

  const formData = `name=${nameField.value}&age=${ageField.value}`;

  xhr.send(formData);

  e.preventDefault();
  return !true;
};

const onReceivedCharacters = (xhr) => {
  var response = JSON.parse(xhr.response);
  console.log(response);
};

const getCharacters = () => {
  const xhr = new XMLHttpRequest();

  console.log('get charac');

  xhr.open('GET', '/getCharacters');
  xhr.setRequestHeader ("Accept", acceptedType);

  xhr.onload = () => onReceivedCharacters(xhr);

  xhr.send();
};

const init = () => {
  getCharacters();

  const userForm = document.querySelector('#userForm');
  const nameForm = document.querySelector('#nameForm');

  userForm.addEventListener('submit', (e) => requestUpdate(e, userForm));
  nameForm.addEventListener('submit', (e) => sendPost(e, nameForm));
};

window.onload = init;
