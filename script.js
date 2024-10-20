const search = document.querySelector('#locationButton');
const image = document.querySelector('.imgDisp img');
const weatherDetails = document.querySelector('.weatherDetails');
const fiveDayForecast = document.getElementById('fiveDayForecast');
window.locationone='';

document.getElementById('locationButton').addEventListener('click', () => {
    const APIkey = '';
    let location = document.getElementById('locationInput').value;

    if (location === '') 
    {
        location = 'Islamabad'; 
    }

    localStorage.setItem('location', location);
    console.log(`Location stored: ${location}`); //debugging


    //for current data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            const temperatureDisplay = document.querySelector('.temperature');
            const humidityDisplay = document.querySelector('.humidity');
            const descriptionDisplay = document.querySelector('.description');
            const windDisplay = document.querySelector('.wind');

            temperatureDisplay.textContent = `Temperature: ${json.main.temp} °C`;
            descriptionDisplay.textContent = `${json.weather[0].description}`;
            humidityDisplay.textContent = `Humidity: ${json.main.humidity}%`;
            windDisplay.textContent = `Wind Speed: ${json.wind.speed} m/s`;

            const updateWeatherImage = (newSrc) => 
            {
                image.classList.remove('show');
                setTimeout(() => {
                    image.src = newSrc;
                    image.classList.add('show');
                }, 500);
            };

            switch (json.weather[0].main) {
                case 'Clear':
                    updateWeatherImage('assets/sun.jpg');
                    break;
                case 'Rain':
                    updateWeatherImage('assets/rain.jpg');
                    break;
                case 'Snow':
                    updateWeatherImage('assets/snow.jpg');
                    break;
                case 'Clouds':
                    updateWeatherImage('assets/cloudy.jpg');
                    break;
                case 'Smoke':
                case 'Mist':
                case 'Haze':
                    updateWeatherImage('assets/mist.jpg');
                    break;
                default:
                    updateWeatherImage(''); 
                    console.log(json.weather[0].main);
                    break;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            temperatureDisplay.textContent = 'Error fetching weather data! Please ensure the location is valid.';
        });

    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
        forecastData = [];
            
            for (let i = 0; i < 5; i++) {
                const forecast = data.list[i * 8]; //each day is on the 8th entry
                const date = new Date(forecast.dt * 1000).toLocaleDateString();
                const temp = Math.round(forecast.main.temp);
                const weatherDescription = forecast.weather[0].description;
                let imageSrc = '';

                switch (forecast.weather[0].main) {
                    case 'Clear':
                        imageSrc = 'assets/sun.jpg';
                        break;
                    case 'Rain':
                        imageSrc = 'assets/rain.jpg';
                        break;
                    case 'Snow':
                        imageSrc = 'assets/snow.jpg';
                        break;
                    case 'Clouds':
                        imageSrc = 'assets/cloudy.jpg';
                        break;
                    case 'Mist':
                    case 'Haze':
                        imageSrc = 'assets/mist.jpg';
                        break;
                    default:
                        imageSrc = ''; 
                        break;
                }

                
                document.getElementById(`date${i + 1}`).textContent = date;
                document.getElementById(`img${i + 1}`).src = imageSrc;
                document.getElementById(`temp${i + 1}`).textContent = `${temp}°C`;
                document.getElementById(`desc${i + 1}`).textContent = weatherDescription;

                
                forecastData.push({
                    date: date,
                    imageSrc: imageSrc,
                    temperature: temp,
                    weatherCondition: weatherDescription
                });
                
            }
        })
        .catch(error => console.error('Error fetching 5-day forecast:', error));
});


function displayForecast(data) 
{
    
    if (data.length === 0) {
        console.error("No forecast data to display!");  
        return;
    }

   
    data.forEach((entry, index) => 
    {
        document.getElementById(`date${index + 1}`).textContent = entry.date; 
        document.getElementById(`img${index + 1}`).src = entry.imageSrc; 
        document.getElementById(`temp${index + 1}`).textContent = `${entry.temperature}°C`; 
        document.getElementById(`desc${index + 1}`).textContent = entry.weatherCondition; 
    });
}


function showTemperaturesAscending() 
{
    const sortedData = [...forecastData].sort((a, b) => a.temperature - b.temperature);
    console.log("Ascending sorted data:", sortedData);
    displayForecast(sortedData);
}

function showTemperaturesDescending() 
{
    const sortedData = [...forecastData].sort((a, b) => b.temperature - a.temperature);
    console.log("Descending sorted data:", sortedData);
    displayForecast(sortedData);
}

function filterRainyDays() 
{
    const rainyDays = forecastData.filter(entry => entry.weatherCondition === 'Rain');
    displayForecast(rainyDays);
}


document.getElementById('ascButton').addEventListener('click', showTemperaturesAscending);
document.getElementById('descButton').addEventListener('click', showTemperaturesDescending);
document.getElementById('wrButton').addEventListener('click', filterRainyDays);
