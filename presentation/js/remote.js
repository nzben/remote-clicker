$(function() {
  var server_address = 'http://' + location.hostname + ':' + config.port;
  var socket = io.connect(server_address);

  socket.on('transition_next', function(data) {
    impress().next(socket);
  });

  socket.on('transition_prev', function(data) {
    impress().prev(socket);    
  });

  socket.on('connection_test', function(data){
    console.log('Sending connection ok');
    socket.emit('connection_response_request', 'ok');
  });
});