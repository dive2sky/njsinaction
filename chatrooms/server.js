
var http = require('http');

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  // read file in filePath and return fileContents with http status code and mime-type
}

function serveStatic(response, cache, absPath) {
  // is file cached?
  // is file exists?
  // read file and cache data
  // call sendFile function
}

var server = http.createServer(function (request, response) {
  //send404(response);
  // get file path from request url and call serveStatic Function
});

server.listen(3000, function() {
  console.log("Server listening on port 3000");
});
