//This file contains the code that runs on the Tessel (server-side)

//These are built-in from Node
var http = require("http");
var os = require("os");
var path = require("path");

//Creating a new Board instance
var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

var Express = require("express");
var SocketIO = require("socket.io");

var application = new Express();
var server = new http.Server(application);
var io = new SocketIO(server);

application.use(Express.static(path.join(__dirname, "/app")));
//This might be removable
application.use("/node_modules", Express.static(__dirname + "/node_modules/"));

board.on("ready", () => {
  var clients = new Set();
  var monitor = new five.Multi({
    controller: "BME280",
    //This is for Oakland, but is location-specific
    elevation: 29,
  });

  //Disabled the soil sensor to speed up development
  //var soil = new five.Sensor("a7");


  //This monitors the BME280
  var updated = Date.now() - 5000;

  monitor.on("change", () => {
    var now = Date.now();
    if (now - updated >= 5000) {
      updated = now;

      clients.forEach(recipient => {
        recipient.emit("report", {
          thermometerC: monitor.thermometer.celsius,
          thermometerF: monitor.thermometer.fahrenheit,
          barometerkPa: monitor.barometer.pressure,
          hygrometer: monitor.hygrometer.relativeHumidity,
          altimeter: monitor.altimeter.meters
          //Disabled the soil sensor to speed up development
          //soilMoisture: soil.value
        });
      });
    }
  });

  //This could be used to monitor the soil moisture sensor

  // soil.on("change", () => {})


  io.on("connection", socket => {
    // Allow up to 2 monitor sockets to
    // connect to this enviro-monitor server
    if (clients.size < 2) {
      clients.add(socket);
      // When the socket disconnects, remove
      // it from the recipient set.
      socket.on("disconnect", () => clients.delete(socket));
    }
  });

  var port = 3000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});
