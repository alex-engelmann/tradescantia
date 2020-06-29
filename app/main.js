//This is executed in the client's web browser (client-side)

window.onload = function() {
    var socket = io();
    var monitor = {};
  
    monitor.thermometerC = new JustGage({
      id: "thermometerC",
      value: 0,
      min: -40.0,
      max: 85.0,
      title: "World Thermometer",
      label: "° Celsius",
      decimals: 1,
      relativeGaugeSize: true,
    });

    monitor.thermometerF = new JustGage({
      id: "thermometerF",
      value: 0,
      min: 32.0,
      max: 212.0,
      title: "USA Thermometer",
      label: "° Fahrenheit",
      decimals: 1,
      relativeGaugeSize: true,
    });
  
    monitor.barometer = new JustGage({
      id: "barometer",
      value: 0,
      min: 50,
      max: 150,
      title: "Barometer",
      label: "Pressure/kPa",
      relativeGaugeSize: true,
    });
  
    monitor.altimeter = new JustGage({
      id: "altimeter",
      value: 0,
      min: 0,
      max: 100,
      title: "Altimeter",
      label: "Meters",
      decimals: 1,
      relativeGaugeSize: true,
    });
  
    monitor.hygrometer = new JustGage({
      id: "hygrometer",
      value: 10,
      min: 0,
      max: 100,
      title: "Hygrometer",
      label: "Humidity %",
      decimals: 1,
      relativeGaugeSize: true,
    });

    monitor.soilMoisture = new JustGage({
      id: "soilMoisture",
      value: 0,
      min: 0,
      max: 800,
      title: "Soil Moisture",
      label: "Soil Moisture",
      decimals: 1,
      relativeGaugeSize: true,
    });


  
    var displays = Object.keys(monitor);
  
    socket.on("report", function (data) {
      displays.forEach(function (display) {
        monitor[display].refresh(data[display]);
      });
    });
  };
  