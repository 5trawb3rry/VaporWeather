
let forecastData =[];

document.addEventListener('DOMContentLoaded', () => 
{
    const APIkey = '';
    const storedLocation = localStorage.getItem('location');

    
    if (storedLocation) 
    {
        console.log(`Location retrieved from local storage: ${storedLocation}`); //debugging
    
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${storedLocation}&units=metric&appid=${APIkey}`)
            .then(response => response.json())
            .then(data => 
            {
        
                const tbody = document.querySelector('#forecast-table tbody'); 

                tbody.innerHTML = '';

                for (let i = 0; i < 5; i++) 
                {
                    const forecast = data.list[i * 8]; //each day is on the 8th entry
                    const date = new Date(forecast.dt * 1000).toLocaleDateString();
                    const temp = Math.round(forecast.main.temp);
                    const weatherDescription = forecast.weather[0].description;

                    
                    const row = document.createElement('tr');

                    
                    const dateCell = document.createElement('td');
                    dateCell.textContent = date;
                    row.appendChild(dateCell);

                    const tempCell = document.createElement('td');
                    tempCell.textContent = `${temp}°C`;
                    row.appendChild(tempCell);

                    const descCell = document.createElement('td');
                    descCell.textContent = weatherDescription;
                    row.appendChild(descCell);

                    
                    tbody.appendChild(row);

                    //store in array for gemini
                    forecastData.push(
                    {
                        date: date,
                        temperature: temp,
                        weatherCondition: weatherDescription
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    } 
    else
    {
        console.log('No location found in local storage.');
    }
});


const geminiAPI ='';
async function generate(message) {
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiAPI}`;
    
    const requestBody = {
        "contents": [{
            "parts": [{ "text": message }]
        }]
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


document.getElementById('askButton').addEventListener('click', () => 
{
        const userPrompt = document.querySelector('.geminiPrompt').value;
    
        const forecastString = forecastData.map(item => 
            `Date: ${item.date}, Temperature: ${item.temperature}°C, Condition: ${item.weatherCondition}`
        ).join('\n'); //convert to string for gemini
    
        const fullPrompt = `You will answer only weather/climate-related questions. Refuse to answer
                            any other questions. Here is the user's question:
                            ${userPrompt}\nHere is the weather forecast data:\n${forecastString}\n.`;
    
        console.log(forecastString); //debugging
    
        generate(fullPrompt).then(response => 
        {
            const outputTextArea = document.getElementById('output'); 
            
            if (response.candidates && response.candidates.length > 0) {
                outputTextArea.value = response.candidates[0].content.parts[0].text; //write to text area with id 'output'
            } else {
                outputTextArea.value = 'No response generated.';
                console.error('No candidates in response:', response);
            }
        }).catch(error => {
            console.error('Error while generating content:', error);
            document.getElementById('output').value = 'Error generating content.';
        });
});
    
