var ct1A = document.getElementById('mem-load1A').getContext('2d');
var ct1B = document.getElementById('mem-load1B').getContext('2d');
var ct2A = document.getElementById('mem-load2A').getContext('2d');
var ct2B = document.getElementById('mem-load2B').getContext('2d');

var socket = io.connect('http://localhost:5000');

var data_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var params = {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
    labels: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    datasets: [{
        label: "Sin(t)",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        cubicInterpolationMode: 'monotone',
        lineTension: 0,
        data: data_array,

    }]
},

// Configuration options go here
options: {
  animation: {
    duration: 500, // general animation time
},
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  min: -1,
                  max: 1
              }
          }]
        }
}
}
var memload1A = new Chart(ct1A, params);
var memload1B = new Chart(ct1B, params);
var memload2A = new Chart(ct2A, params);
var memload2B = new Chart(ct2B, params);


socket.on('connect', function () {
    socket.send("USER HAS CONNECTED");
});


// When "new-chart-data" message is recieved, update chart with data
socket.on('new-chart-data', function (data) {
        console.log("Updating chart!");

        memload1A.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
        });
        memload1A.data.datasets.forEach((dataset) => {
          dataset.data.shift();
        });
        memload1A.update();

});
