var ctBar = document.getElementById('mem-util').getContext('2d');


var databar = [3,4,5,6];
var databar2 = [1,2,1,1.5];

var params = {
// The type of chart we want to create
type: 'bar',

// The data for our dataset
data: {
    labels: ['1A','1B','2A','2B'],
    datasets:
    [
      {
        label: "1A",
        backgroundColor: '#7F7F7F',
        borderColor: '#7F7F7F',
        fill: false,
        cubicInterpolationMode: 'monotone',
        lineTension: 0,
        data: databar,
      },
      {
        label: "1B",
        backgroundColor: '#B8B8B8',
        borderColor: '#B8B8B8',
        fill: false,
        cubicInterpolationMode: 'monotone',
        lineTension: 0,
        data: databar,
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
                  min: 0,
                  max: 10
              }
          }],
      xAxes: [{
              display: false,
          }]
        }
}
}
var bar = new Chart(ctBar, params);



socket.on('connect', function () {
    socket.send("USER HAS CONNECTED");
});
