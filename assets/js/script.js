document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'c0091532d2936a2f6779048bf50526f0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherContainer = document.getElementById('weatherContainer');
                weatherContainer.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">Temperature: ${data.main.temp}°C</p>
                            <p class="card-text">Weather: ${data.weather[0].description}</p>
                            <p class="card-text">Humidity: ${data.main.humidity}%</p>
                            <p class="card-text">Wind Speed: ${data.wind.speed} m/s</p>
                        </div>
                    </div>
                `;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
