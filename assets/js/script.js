document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2); // Initialize map at a global view

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    document.getElementById('getWeather').addEventListener('click', function() {
        const city = document.getElementById('city').value;
        const apiKey = 'c0091532d2936a2f6779048bf50526f0'; // Your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Display loading message
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.style.display = 'none';
        weatherInfo.classList.remove('alert-success', 'alert-danger');
        weatherInfo.classList.add('alert-info');
        weatherInfo.textContent = 'Loading...';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const lat = data.coord.lat;
                    const lon = data.coord.lon;
                    map.setView([lat, lon], 10); // Zoom into the city

                    // Add marker with weather information
                    const marker = L.marker([lat, lon]).addTo(map);
                    marker.bindPopup(`
                        <b>${data.name}</b><br>
                        Temperature: ${data.main.temp}°C<br>
                        Weather: ${data.weather[0].description}<br>
                        Humidity: ${data.main.humidity}%<br>
                        Wind Speed: ${data.wind.speed} m/s
                    `).openPopup();

                    // Display weather information
                    weatherInfo.style.display = 'block';
                    weatherInfo.classList.remove('alert-info', 'alert-danger');
                    weatherInfo.classList.add('alert-success');
                    weatherInfo.innerHTML = `
                        <strong>${data.name}</strong><br>
                        Temperature: ${data.main.temp}°C<br>
                        Weather: ${data.weather[0].description}<br>
                        Humidity: ${data.main.humidity}%<br>
                        Wind Speed: ${data.wind.speed} m/s
                    `;
                } else {
                    weatherInfo.style.display = 'block';
                    weatherInfo.classList.remove('alert-info', 'alert-success');
                    weatherInfo.classList.add('alert-danger');
                    weatherInfo.textContent = 'City not found. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.style.display = 'block';
                weatherInfo.classList.remove('alert-info', 'alert-success');
                weatherInfo.classList.add('alert-danger');
                weatherInfo.textContent = 'Error fetching weather data. Please try again later.';
            });
    });
});


