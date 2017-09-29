'use strict';

const http = require('http');
const url = require("url");

const detie = require("./detie-api.js");

const hostname = '0.0.0.0';
const port = 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname !== '/detie') {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
    return;
  }

  //console.log(parsedUrl.query);
  const params = parsedUrl.query;
  detie(params).then(response => {
    //console.log(response);
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(response);
    console.log('finish!!');
  }, (err) => {
    res.writeHead(500, {"Content-Type": "text/plain"});
    res.write("500 Internal Server Error\n");
    res.end();
  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
