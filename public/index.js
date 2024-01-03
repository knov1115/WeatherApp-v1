const apiKey = "c865ac5dd88e4d52967105539232812 ";
const apiUrl = "http://api.weatherapi.com/v1/current.json";




const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const currentLocation = "";
const currentTemp = 0;

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


function fetchWeather(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching weather data:', data.error.message);
            } else {
                const locationName = data.location.name;
                const temperature = data.current.temp_c;
                const description = data.current.condition.text;
                const weatherIcon = data.current.condition.icon;

                // Update text content
                locationElement.textContent = `Location: ${locationName}`;
                temperatureElement.textContent = `Temperature: ${temperature}°C`;
                descriptionElement.textContent = `Description: ${description}`;

                // Update image based on weather condition
                const weatherImage = document.getElementById('weatherImage');
                weatherImage.src = `http:${weatherIcon}`;
                weatherImage.alt = `${description} Weather`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

