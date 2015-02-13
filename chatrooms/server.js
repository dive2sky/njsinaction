
var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');
var cache = {};

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  // read file in filePath and return fileContents with http status code and mime-type
  response.writeHead(
    200,
    {'Content-Type': mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serveStatic(response, cache, filePath) {
  if ( cache[filePath] ) {
    sendFile(response, filePath, cache[filePath]);
  } else {
    fs.exists(filePath, function (exists) {
      if (exists) {
        fs.readFile(filePath, function(err, data) {
          if(err) {
            console.log( filePath + " fs.readfile error!");
          } else {
            //cache[filePath] = data;
            sendFile(response,filePath,data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function (request, response) {
  // get file path from request url and call serveStatic Function

  var pathName = url.parse(request.url).pathname;
  var filePath = false;

  if (pathName == '/') {
    filePath = './public/index.html';
  } else {
    filePath = './public' + pathName;
  }

  serveStatic(response, cache, filePath);
});

server.listen(3000, function() {
  console.log("Server listening on port 3000");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);
