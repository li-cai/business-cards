const http = require('http');
const url = require('url');
const query = require('querystring');

const fileHandler = require('./server/fileResponses.js');
const responseHandler = require('./server/responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const GET_URL_STRUCT = {
  '/': fileHandler.getIndex,
  '/style.css': fileHandler.getCSS,
  '/bundle.js': fileHandler.getJS,
  '/media/email-ico.png': fileHandler.getEmailIco,
  '/media/link-ico.png': fileHandler.getLinkIco,
  '/media/logo.png': fileHandler.getLogo,
  '/media/add-ico.png': fileHandler.getAddIco,
  '/getFolios': responseHandler.getFolios,
  '/notReal': responseHandler.notFound,
};

// const HEAD_URL_STRUCT = {
//   '/getUsers': responseHandler.getUsersHead,
//   '/notReal': responseHandler.notFoundHead,
// };

const onRequest = (request, response) => {
  console.log(request.url);

  const pathname = url.parse(request.url, true).pathname;

  switch (request.method) {
    case 'GET':
      if (!GET_URL_STRUCT[pathname]) {
        responseHandler.notFound(request, response);
      } else {
        GET_URL_STRUCT[pathname](request, response);
      }
      break;

    case 'HEAD':
      // if (!HEAD_URL_STRUCT[pathname]) {
      //   responseHandler.notFound(request, response);
      // } else {
      //   HEAD_URL_STRUCT[pathname](request, response);
      // }
      break;

    case 'POST':
      if (pathname === '/addFolio') {
        const res = response;
        const body = [];

        request.on('error', (err) => {
          console.dir(err);
          res.statusCode = 400;
          res.end();
        });

        request.on('data', (chunk) => {
          body.push(chunk);
        });

        request.on('end', () => {
          const bodyString = Buffer.concat(body).toString();
          const bodyParams = query.parse(bodyString);

          console.log(bodyParams);

          // responseHandler.addFolio(request, res, bodyParams);
        });
      } else {
        responseHandler.notFound(request, response);
      }
      break;

    default:
      responseHandler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
