var express = require('express');
var app = express();
var server = app.listen(process.env.PORT ? process.env.PORT : 1337);
var io = require('socket.io').listen(server);
io.set('transports', ['xhr-polling']);

var config = require('./config');

var remotes = [];

io.set('log level', 1);

app.configure(function(){
  app.use(express.static(__dirname + '/presentation'));
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/presentation/index.html');
});

app.get('/clicker', function(req, res){
  res.sendfile(__dirname + '/login/index.html');
});

// socket io
io.sockets.on('connection', function (socket) {
  console.log('connected');

  // handle login request
  socket.on('login', function(data) {
    // if valid passcode
    if(data.passcode == config.passcode) {
      // add connection to list of remotes
      remotes.push(socket.id);
      io.sockets.socket(socket.id).emit('valid');
    }
  });

  socket.on('request_next', function(data) {
    if(remotes.indexOf(socket.id) > -1)
      io.sockets.emit('transition_next');
  });

  socket.on('request_prev', function(data) {
    if(remotes.indexOf(socket.id) > -1)
      io.sockets.emit('transition_prev');
  });

  socket.on('connection_test_request', function(data){
    console.log('Got connection test request');
    remotes.push(socket.id);
    io.sockets.emit('connection_test', data);
  });

  socket.on('connection_response_request', function(data) {
    console.log('Got connection response request');
    remotes.push(socket.id);
    io.sockets.emit('connection_response', data);
  });


  socket.on('notes_request', function(data){
    console.log('Got notes: '+data);
    remotes.push(socket.id);
    io.sockets.emit('notes', data);
  });
});