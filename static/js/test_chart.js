var ctx = document.getElementById('myChart').getContext('2d');

var socket = io.connect('http://localhost:5000');

var data_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var chart = new Chart(ctx, {
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
});

//var data_array = [2,3];

socket.on('connect', function () {
    socket.send("USER HAS CONNECTED");
});

//drawTempChart([1,2,4])

// When "new-chart-data" message is recieved, update chart with data
socket.on('new-chart-data', function (data) {
        console.log("Updating chart!");
        console.log(data);
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
        });
        chart.data.datasets.forEach((dataset) => {
          dataset.data.shift();
        });
        chart.update();

});
