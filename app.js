var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8081));
var five = require('johnny-five');

app.use(express.static(__dirname + '/'));

app.get('/', function (req,res) {
  	res.sendFile(__dirname + '/index.html');
});


var board = new five.Board({
  	repl:false
});


board.on('ready', function () {
    var speed, commands, motors;

    var temp = new five.Temperature({
      pin: "A0",
      controller: "LM35"
    });

    var cochera = new five.Led(13),
    commands = null;

    var comedor = new five.Led(12),
    commands = null;

    var sala = new five.Led(11),
    commands = null;

    var cocina = new five.Led(10),
    commands = null;

    var pasillo = new five.Led(9),
    commands = null;

    var dor2 = new five.Led(8),
    commands = null;

    var dor1 = new five.Led(7),
    commands = null;

    var bano = new five.Led(6),
    commands = null;

    var aseo = new five.Led(5),
    commands = null;

    io.on('connection', function (socket) {


        temp.on("change", function() {
          temperaturaactual=this.celsius;
          console.log("Temp: %d", this.celsius);
          io.sockets.emit("mensaje_servidor", temperaturaactual);
        });

        socket.on('apagarcochera', function (){
            cochera.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prendercocheta', function (){
            cochera.on(); // to turn on, but not blink
        });

        socket.on('apagarcomedor', function (){
            comedor.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prendercomedor', function (){
            comedor.on(); // to turn on, but not blink
        });

        socket.on('apagarsala', function (){
            sala.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prendersala', function (){
            sala.on(); // to turn on, but not blink
        });

        socket.on('apagarcocina', function (){
            cocina.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prendercocina', function (){
            cocina.on(); // to turn on, but not blink
        });

        socket.on('apagarpasillo', function (){
            pasillo.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prenderpasillo', function (){
            pasillo.on(); // to turn on, but not blink
        });

        socket.on('apagardor2', function (){
            dor2.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prenderdor2', function (){
            dor2.on(); // to turn on, but not blink
        });

        socket.on('apagardor1', function (){
            dor1.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prenderdor1', function (){
            dor1.on(); // to turn on, but not blink
        });

        socket.on('apagarbano', function (){
            bano.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prenderbano', function (){
            bano.on(); // to turn on, but not blink
        });

        socket.on('apagaraseo', function (){
            aseo.off();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('prenderaseo', function (){
            aseo.on(); // to turn on, but not blink
        });


        socket.on('encendertodo', function (){
            cochera.on();
            comedor.on();
            sala.on();
            cocina.on();
            pasillo.on();
            dor2.on();
            dor1.on();
            bano.on();
            aseo.on();


        });

        socket.on('apagartodo', function (){
            cochera.off();
            comedor.off();
            sala.off();
            cocina.off();
            pasillo.off();
            dor2.off();
            dor1.off();
            bano.off();
            aseo.off();
        });
    });
});
