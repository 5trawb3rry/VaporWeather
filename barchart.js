let donutChart;
let barChart;
let lineChart;

   
    const ctxDonut = document.getElementById('donut').getContext('2d');
    donutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temperature',
                data: [0, 0, 0,0, 0], 
                backgroundColor: [
                    'rgb(38, 52, 83)',    
                    'rgb(58, 72, 103)',   
                    'rgb(78, 92, 123)',   
                    'rgb(98, 112, 143)',  
                    'rgb(118, 132, 163)'
                ],
                borderColor: 'white',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '5-Day Temperature Forecast (Donut Chart)',
                    font: {
                        size: 8,
                        family: 'Helvetica',
                        weight: 'bold',
                        color: 'white',
                    }
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });


    const ctxBar = document.getElementById('barchart').getContext('2d');
    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [0, 0, 0, 0, 0], 
                borderWidth: 1,
                backgroundColor: 'rgb(137, 128, 139)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                        
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: '5-Day Temperature Forecast (Bar Chart)',
                    font: {
                        size: 8,
                        family: 'Helvetica',
                        weight: 'bold',
                        color: 'white',
                    }
                },
                color: 'white'
            }
        }
    });

    const ctxLine = document.getElementById('line').getContext('2d');
    lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temperature',
                data: [0, 0, 0, 0, 0], 
                borderColor: 'rgb(38, 52, 83)', 
                backgroundColor: 'rgba(38, 52, 83, 0.2)', 
                fill: true, 
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '5-Day Temperature Forecast',
                    font: {
                        size: 16,
                        family: 'Helvetica',
                        weight: 'bold',
                        color: 'white',
                    }
                },
                legend: {
                    labels: {
                        color: 'white' 
                    }
                }
            }
        }
    });
    
    function updateTemperatures() {
        let temperatureArray = [];
        for (let i = 1; i <= 5; i++) {
            const tempText = document.getElementById(`temp${i}`).textContent;
            const tempValue = parseFloat(tempText.replace('°C', '').trim());
            if (!isNaN(tempValue)) {
                temperatureArray.push(tempValue);
            }
        }
        console.log(temperatureArray, "hello donut"); // Debugging

        if (barChart) {
            barChart.data.datasets[0].data = temperatureArray;
            barChart.update();
        }

        if (lineChart) {
            lineChart.data.datasets[0].data = temperatureArray; 
            lineChart.update();
        }
    }

    function updateConditions()
    {
        let descriptionArray = [];

        for (let i = 1; i <= 5; i++) 
        {
            // Get the description text content
            const descText = document.getElementById(`desc${i}`).textContent;
            descriptionArray.push(descText);
            console.log(descriptionArray);
        }
        if (donutChart) {
            donutChart.data.labels = descriptionArray; 
            donutChart.data.datasets[0].data = Array(descriptionArray.length).fill(1); 
            donutChart.update(); 
        }

    }

 
    document.getElementById('locationButton').addEventListener('click', () => 
    {
        updateTemperatures();
        updateConditions();
    });