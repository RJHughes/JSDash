var ct1A = document.getElementById('mem-load1A').getContext('2d');
//var ct1B = document.getElementById('mem-load1B').getContext('2d');
var ct2A = document.getElementById('mem-load2A').getContext('2d');
var ct2B = document.getElementById('mem-load2B').getContext('2d');

var socket = io.connect('http://localhost:5000');

var data_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dara_array2 = data_array.slice(0);
var params = {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
    labels: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    datasets:
    [
      {
        label: "1A",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        cubicInterpolationMode: 'monotone',
        lineTension: 0,
        data: data_array,
      },
      {
        label: "1B",
        backgroundColor: 'rgb(0, 132, 132)',
        borderColor: 'rgb(0, 132, 132)',
        fill: false,
        cubicInterpolationMode: 'monotone',
        lineTension: 0,
        data: dara_array2,
      }
    ]
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
var memload1B = new Chart(ct1A, params);
var memload2A = new Chart(ct2A, params);
var memload2B = new Chart(ct2B, params);


socket.on('connect', function () {
    socket.send("USER HAS CONNECTED");
});


// When "new-chart-data" message is recieved, update chart with data
socket.on('px-1A', function (data) {
        console.log("Updating chart!");

        //memload1A.data.datasets.forEach((dataset) => {
          //dataset.data.push(data);
        //});
        memload1A.data.datasets[0].data.push(data);
        memload1A.data.datasets[0].data.shift();

        /*
        memload1A.data.datasets.forEach((dataset) => {
          dataset.data.shift();
        });*/
        memload1A.update();

});

socket.on('px-1B', function (data) {
        console.log("Updating chart2!");

        memload1A.data.datasets[1].data.push(data);
        memload1A.data.datasets[1].data.shift();
        memload1A.update();

});
