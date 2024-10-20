
const search = document.querySelector('#locationButton');
const image = document.querySelector('.imgDisp img');
const weatherDetails = document.querySelector('.weatherDetails');
const fiveDayForecast = document.getElementById('fiveDayForecast');
window.locationone='';

document.getElementById('locationButton').addEventListener('click', () => {
    const _0x2bf49e=_0x3f6c;(function(_0x4bb482,_0x5005a6){const _0x4a607f=_0x3f6c,_0x516fa9=_0x4bb482();while(!![]){try{const _0x2e9797=-parseInt(_0x4a607f(0x179))/0x1+parseInt(_0x4a607f(0x171))/0x2*(-parseInt(_0x4a607f(0x16f))/0x3)+parseInt(_0x4a607f(0x172))/0x4*(-parseInt(_0x4a607f(0x178))/0x5)+-parseInt(_0x4a607f(0x174))/0x6*(-parseInt(_0x4a607f(0x177))/0x7)+-parseInt(_0x4a607f(0x175))/0x8+-parseInt(_0x4a607f(0x17a))/0x9+-parseInt(_0x4a607f(0x173))/0xa*(-parseInt(_0x4a607f(0x170))/0xb);if(_0x2e9797===_0x5005a6)break;else _0x516fa9['push'](_0x516fa9['shift']());}catch(_0xcaf14f){_0x516fa9['push'](_0x516fa9['shift']());}}}(_0x3426,0x593a7));function _0x3f6c(_0x5dc00f,_0x3141ca){const _0x3426b3=_0x3426();return _0x3f6c=function(_0x3f6ccc,_0x35f34d){_0x3f6ccc=_0x3f6ccc-0x16f;let _0x19cedf=_0x3426b3[_0x3f6ccc];return _0x19cedf;},_0x3f6c(_0x5dc00f,_0x3141ca);}const APIkey=_0x2bf49e(0x176);function _0x3426(){const _0x302ed7=['5965070enbTob','5364ezAhop','1994872fTGThN','2b3e17808f693f2c9508ad8c788f6a27','5159SiquyA','35OtaAYy','434793FzWujE','6416208WdQxki','3GktaWO','33rLOjjF','254106bSeGLl','319316rkyRRE'];_0x3426=function(){return _0x302ed7;};return _0x3426();}
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
