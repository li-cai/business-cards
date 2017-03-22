const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCSS = fs.readFileSync(`${__dirname}/../client/style.css`);
const scriptsJS = fs.readFileSync(`${__dirname}/../client/build/bundle.js`);

const emailIco = fs.readFileSync(`${__dirname}/../client/media/email-ico.png`);
const linkIco = fs.readFileSync(`${__dirname}/../client/media/link-ico.png`);
const addIco = fs.readFileSync(`${__dirname}/../client/media/add-ico.png`);
const logo = fs.readFileSync(`${__dirname}/../client/media/logo.png`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styleCSS);
  response.end();
};

const getJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(scriptsJS);
  response.end();
};

const getLinkIco = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(linkIco);
  response.end();
};

const getEmailIco = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(emailIco);
  response.end();
};

const getLogo = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(logo);
  response.end();
};

const getAddIco = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(addIco);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getJS,
  getEmailIco,
  getLinkIco,
  getAddIco,
  getLogo,
};
