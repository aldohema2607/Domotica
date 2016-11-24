var socket = io.connect('192.168.1.77:8081', { 'forceNew': true });

socket.on('mensaje_servidor', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data;
  document.getElementById('divtemperatura').innerHTML = html;
}
