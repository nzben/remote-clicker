$(function() {
  var server_address = 'http://' + location.hostname + ':' + config.port;
  io.set('transports', ['xhr-polling']);
  var socket = io.connect(server_address);

  socket.on('transition_next', function(data) {
    var el = impress().next();
    sendNotes(el);
  });

  socket.on('transition_prev', function(data) {
    var el = impress().prev();
    sendNotes(el);
  });

  socket.on('connection_test', function(data){
    console.log('Sending connection ok');
    socket.emit('connection_response_request', 'ok');
  });

  function sendNotes(el){
  	// find the notes div
    var notes = jQuery(el).find('.notes');
    socket.emit('notes', notes.html());
  }

});