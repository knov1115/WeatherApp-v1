const apiKey = "c865ac5dd88e4d52967105539232812";
const apiUrl = "https://api.weatherapi.com/v1/current.json";




const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const infoTempElement = document.getElementById('infoTemp')
const windElement = document.getElementById('windElement')
const humidityElement = document.getElementById('humidityElement')
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
                const infoTemp = `${data.current.temp_c} °C`;
                const infoWind = `${data.current.wind_kph} m/s`;
                const infoHumidity = `${data.current.humidity} %`;
                const weatherIcon = data.current.condition.icon;

                // Update text content
                locationElement.textContent = locationName;
                temperatureElement.textContent = temperature;
                descriptionElement.textContent = description;
                infoTempElement.textContent = infoTemp;
                windElement.textContent = infoWind;
                humidityElement.textContent = infoHumidity;
                //Update image based on weather condition
                const weatherImage = document.getElementById('weatherImage');
                weatherImage.src = `https:${weatherIcon}`;
                weatherImage.alt = `${description} Weather`;
                //For info panel
                const infoWeatherImage = document.getElementById('infoWeatherImage');
                infoWeatherImage.src = `https:${weatherIcon}`;
                infoWeatherImage.alt = `${description} Weather`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

