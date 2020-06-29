var Tessel = require("tessel-io");
var five = require("johnny-five");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var monitor = new five.Multi({
    controller: "BME280"
  });


  //This will continuously monitor and output
  //which is too fast to read

  // monitor.on("change", function () {
  //   console.log("thermometer");
  //   console.log("  celsius      : ", this.thermometer.celsius);
  //   console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
  //   console.log("  kelvin       : ", this.thermometer.kelvin);
  //   console.log("--------------------------------------");

  //   console.log("barometer");
  //   console.log("  pressure     : ", this.barometer.pressure);
  //   console.log("--------------------------------------");

  //   console.log("altimeter");
  //   console.log("  feet         : ", this.altimeter.feet);
  //   console.log("  meters       : ", this.altimeter.meters);
  //   console.log("--------------------------------------");
  // });

  //Below is one that only logs every 5s

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  monitor.on("change", function () {
      console.log("thermometer");
      console.log("  celsius      : ", this.thermometer.celsius);
      console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
      console.log("  kelvin       : ", this.thermometer.kelvin);
      console.log("--------------------------------------");

      console.log("barometer");
      console.log("  pressure     : ", this.barometer.pressure);
      console.log("--------------------------------------");

      console.log("altimeter");
      console.log("  feet         : ", this.altimeter.feet);
      console.log("  meters       : ", this.altimeter.meters);
      console.log("--------------------------------------");
      sleep(5000);
  });



});
