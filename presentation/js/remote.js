$(function() {
  var server_address = 'http://' + location.hostname + ':8080';
  var socket = io.connect(server_address);

  socket.on('transition_next', function(data) {
    impress().next();
  });

  socket.on('transition_prev', function(data) {
    impress().prev();
  });

});