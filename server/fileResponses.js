const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCSS = fs.readFileSync(`${__dirname}/../client/style.css`);
const scriptsJS = fs.readFileSync(`${__dirname}/../client/build/bundle.js`);

const char1Img = fs.readFileSync(`${__dirname}/../client/media/char1.png`);

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

const getChar1Image = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(char1Img);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getJS,
  getChar1Image,
};
