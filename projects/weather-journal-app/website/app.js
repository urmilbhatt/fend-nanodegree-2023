/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=4a22dbfb0bc3c1ce0fbe59290a5e2170';

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const newZipcode = document.getElementById('zip').value + ',us';
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZipcode, apiKey)
        .then(function (data) {
            console.log({ data });
            if (data && data.main && data.main.temp) {
                // Convert temp to Fahrenheit scale
                const temp = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(0) + '°F';
                // Entry to be posted
                const newData = {
                    date: newDate,
                    temp: temp,
                    feelings: feelings
                };
                postWeather('http://localhost:8000/addWeather', newData)
                    .then(function () {
                        updateUI();
                    })
                    .catch(function (error) {
                        console.log('Failed to post weather data:', error);
                    });
            } else {
                console.log('Invalid weather data received');
            }
        })
        .catch(function (error) {
            console.log('Failed to retrieve weather data:', error);
        });
}

/* Function to GET Web API Data */
const getWeather = async (baseURL, zipcode, key) => {
    const url = baseURL + zipcode + key;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to retrieve weather data');
    }
};

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to post weather data');
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    if (request.ok) {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.feelings;
    } else {
        console.log('Failed to retrieve project data');
    }
};