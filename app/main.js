//This is executed in the client's web browser (client-side)

window.onload = function() {
    var socket = io();
    var monitor = {};
  
    monitor.thermometerC = new JustGage({
      id: "thermometerC",
      value: 0,
      min: -40.0,
      max: 85.0,
      label: "° Celsius",
      decimals: 2,
      relativeGaugeSize: true,
    });

    monitor.thermometerF = new JustGage({
      id: "thermometerF",
      value: 0,
      min: 32.0,
      max: 212.0,
      label: "° Fahrenheit",
      decimals: 2,
      relativeGaugeSize: true,
    });
  
    monitor.barometerkPa = new JustGage({
      id: "barometerkPa",
      value: 0,
      min: 50,
      max: 150,
      label: "Pressure/kPa",
      decimals: 3,
      relativeGaugeSize: true,
    });



  
    monitor.altimeter = new JustGage({
      id: "altimeter",
      value: 0,
      min: 0,
      max: 100,
      label: "Meters",
      decimals: 10,
      relativeGaugeSize: true,
    });
  
    monitor.hygrometer = new JustGage({
      id: "hygrometer",
      value: 10,
      min: 0,
      max: 100,
      label: "Humidity %",
      decimals: 3,
      relativeGaugeSize: true,
    });
    
    //Disabled the soil sensor to speed up development
    // monitor.soilMoisture = new JustGage({
    //   id: "soilMoisture",
    //   value: 0,
    //   min: 0,
    //   max: 900,
    //   label: "Soil Moisture",
    //   decimals: 0,
    //   relativeGaugeSize: true,
    // });


  
    var displays = Object.keys(monitor);
  
    socket.on("report", function (data) {
      displays.forEach(function (display) {
        monitor[display].refresh(data[display]);
      });
    });
  };
  