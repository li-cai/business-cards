const crypto = require('crypto');

const folios = {
  'Haskell B. Curry': {
    name: 'Haskell B. Curry',
    title: 'Game Design and Development (BS)',
    email: 'haskell@cs.rit.edu',
    portfolio: 'https://en.wikipedia.org/wiki/Haskell_Curry',
    interests: ['Web Dev', 'Android', 'Game Dev', 'Animation'],
  },
  'Cailin Li': {
    name: 'Cailin Li',
    title: 'New Media Interactive Development (BS)',
    email: 'cxl2467@rit.edu',
    portfolio: 'http://cailinli.me',
    interests: ['Web Dev', 'Mobile Dev', 'iOS', 'Front-End Dev', 'UI/UX Design'],
  },
  'Junie B. Jones': {
    name: 'Junie B. Jones',
    title: 'New Media Design (MFA)',
    email: 'test123@gmail.com',
    portfolio: 'http://creativity.cias.rit.edu/',
    interests: ['Visual Design', 'Mobile Design', 'Project Management'],
  },
};

let etag = crypto.createHash('sha1').update(JSON.stringify(folios));
let digest = etag.digest('hex');

const updateDigest = () => {
  etag = crypto.createHash('sha1').update(JSON.stringify(folios));
  digest = etag.digest('hex');
};

const sendResponse = (request, response, status, obj) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    etag: digest,
  });

  response.write(JSON.stringify(obj));
  response.end();
};

const sendResponseHead = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
    etag: digest,
  };

  response.writeHead(status, headers);
  response.end();
};

const addFolio = (request, response, body) => {
  const responseJSON = {
    message: 'Name, title, interests, email and portfolio link are all required',
  };

  const { name, title, email, portfolio } = body;

  const interests = [];
  Object.keys(body).forEach((key) => {
    if (body[key] === 'on') {
      interests.push(key);
    }
  });

  if (!name || !title || !interests || !email || !portfolio) {
    responseJSON.id = 'missingParams';
    return sendResponse(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (folios[name]) {
    responseCode = 204;
  } else {
    folios[name] = {};
  }

  folios[name] = { name, title, interests, email, portfolio };

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return sendResponse(request, response, responseCode, responseJSON);
  }

  return sendResponseHead(request, response, responseCode);
};

const filterFolios = (major) => {
  const filtered = {};

  Object.keys(folios).forEach((key) => {
    const folio = folios[key];

    if (folio.title === major) {
      filtered[key] = folio;
    }
  });

  return filtered;
};

const filterByQuery = (request, response, query) => {
  let results = folios;

  if (query.major && query.major !== 'All Majors') {
    results = filterFolios(query.major);
  }

  return sendResponse(request, response, 200, results);
};

const getFolios = (request, response, query) => {
  updateDigest();

  if (query && Object.keys(query).length > 0) {
    return filterByQuery(request, response, query);
  }

  if (request.headers['if-none-match'] === digest) {
    console.log('no change');
    return sendResponseHead(request, response, 304);
  }

  return sendResponse(request, response, 200, folios);
};

const getFoliosHead = (request, response) => {
  updateDigest();

  if (request.headers['if-none-match'] === digest) {
    return sendResponseHead(request, response, 304);
  }

  return sendResponseHead(request, response, 200);
};

const notFound = (request, response) => {
  const resjson = {
    message: 'The page you are looking for was not found.',
    id: 'notReal',
  };

  sendResponse(request, response, 404, resjson);
};

module.exports = {
  addFolio,
  getFolios,
  getFoliosHead,
  notFound,
};
