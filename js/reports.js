$(function() {

  // Income chart
  //days
  const xValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  new Chart("incomeChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{ 
        label: "Médico 1",
        data: [860,1140,0,1060,1070,1110,1330,0,7830,2478,0,0,1060,1060,1070,1110,1330,0,7830,0],
        backgroundColor: "#e54877",
        fill: false
      }, { 
        label: "Médico 1",
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000, 300,700,2000,5000,6000,4000,2000,1000,200,100],
        backgroundColor: "#4379df",
        fill: false
      }, { 
        label: "Médico 1",
        data: [300,700,2000,5000,0,0,2000,1000,200,100,300,0,0,5000,6000,4000,2000,1000,0,0],
        backgroundColor: "#efae70",
        fill: false
      }]
    },
    options: {
      legend: {display: true},
      scales: {
        yAxes: [{
          stacked: true,
          type: 'linear',
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              return "$" + value;
            }
          }
        }]
      }
    }
  });

    //Productivity days chart
    // Generate random data for days of the week
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const randomData = days.map(() => 10 + Math.floor(Math.random())*10 + Math.floor(Math.random() * 50));

    // Get the canvas element
    const ctx = document.getElementById('productivityWeekChart').getContext('2d');

    // Create the pie chart
    new Chart(ctx, {
        type: 'pie',
        data: {
        labels: days,
        datasets: [{
            data: randomData,
            backgroundColor: [
                '#dcdfe2',
                '#5face1',
                '#4379df',
                '#fbcf7c',
                '#ef7b7a',
                '#e54877',
                '#fbe072',
                '#efae70',
                '#e57e6d',
            ]
        }]
        },
        options: {
        title: {
            display: true,
            text: 'Visitas acumuladas por día'
        }
        }
    });
})