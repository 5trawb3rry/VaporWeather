
let forecastData =[];

document.addEventListener('DOMContentLoaded', () => 
{
    (function(_0x4b2763,_0x26fc88){const _0x38af4e=_0x27ff,_0x11fc1a=_0x4b2763();while(!![]){try{const _0x3f7daf=-parseInt(_0x38af4e(0x115))/0x1*(-parseInt(_0x38af4e(0x112))/0x2)+parseInt(_0x38af4e(0x110))/0x3+parseInt(_0x38af4e(0x113))/0x4+-parseInt(_0x38af4e(0x114))/0x5*(-parseInt(_0x38af4e(0x117))/0x6)+parseInt(_0x38af4e(0x116))/0x7+-parseInt(_0x38af4e(0x111))/0x8+parseInt(_0x38af4e(0x118))/0x9*(-parseInt(_0x38af4e(0x10f))/0xa);if(_0x3f7daf===_0x26fc88)break;else _0x11fc1a['push'](_0x11fc1a['shift']());}catch(_0x36cde5){_0x11fc1a['push'](_0x11fc1a['shift']());}}}(_0x3926,0x24c80));const APIkey='2b3e17808f693f2c9508ad8c788f6a27';function _0x27ff(_0x374f50,_0x4e0e8a){const _0x39263f=_0x3926();return _0x27ff=function(_0x27fffd,_0x3cc118){_0x27fffd=_0x27fffd-0x10f;let _0x244394=_0x39263f[_0x27fffd];return _0x244394;},_0x27ff(_0x374f50,_0x4e0e8a);}function _0x3926(){const _0x58aa02=['830692PDCwSk','167565nqFZxr','161374tTyZrL','1000069guuLxW','18hTKPjR','3812022SXzvAc','10reIpCV','462036UumbnH','1538008lALsqj','2wMSAVb'];_0x3926=function(){return _0x58aa02;};return _0x3926();}
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


const _0x4b6851=_0xe820;function _0xe820(_0x382f2b,_0x823f33){const _0x286d42=_0x286d();return _0xe820=function(_0xe8203b,_0x3db23a){_0xe8203b=_0xe8203b-0x14d;let _0x4b44ce=_0x286d42[_0xe8203b];return _0x4b44ce;},_0xe820(_0x382f2b,_0x823f33);}function _0x286d(){const _0x42a79b=['AIzaSyCOyhW36e7gyeB6nFMcMk9zJnAAvkKLBpU','3274620EFFqmg','8xqEbhq','1689240PqoRuX','393HEVYCn','217124xGOJFB','1645758IlbbgC','15039873mwcZlc','1446ADSwRk','5390266LLhSvL','5nUWJBr'];_0x286d=function(){return _0x42a79b;};return _0x286d();}(function(_0x1e0cc5,_0x4bf854){const _0x2e682f=_0xe820,_0x274561=_0x1e0cc5();while(!![]){try{const _0x5f57b=-parseInt(_0x2e682f(0x152))/0x1+parseInt(_0x2e682f(0x155))/0x2*(-parseInt(_0x2e682f(0x151))/0x3)+parseInt(_0x2e682f(0x14e))/0x4*(-parseInt(_0x2e682f(0x157))/0x5)+-parseInt(_0x2e682f(0x153))/0x6+parseInt(_0x2e682f(0x156))/0x7+-parseInt(_0x2e682f(0x14f))/0x8*(-parseInt(_0x2e682f(0x154))/0x9)+-parseInt(_0x2e682f(0x150))/0xa;if(_0x5f57b===_0x4bf854)break;else _0x274561['push'](_0x274561['shift']());}catch(_0x1e5225){_0x274561['push'](_0x274561['shift']());}}}(_0x286d,0xd3c62));const geminiAPI=_0x4b6851(0x14d);
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
    
        const fullPrompt = `You will answer only weather/climate-related questions. Give them clothing 
                             advice based on the weather IF THEY ASK. Questions such as "should i
                             carry an umbrella or wear a jacket or is it sunny? SHOULD BE ANSWERED. Refuse to answer
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
    
