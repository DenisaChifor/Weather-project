// Aici vom declara functia care ne scheama API-ul de la OpenWeather pentru vremea curent si ne va afisa datele in pagina - apelul
// catre functia asta se va face din chooseLocation.js (pe event listenerele deja adaugate pe butoanele din dropdown)

function displayCurrentWeather(city) {
    // Prima data ne generam link-ul catre care vom face call-ul
    const currentWeatherEndpoint = getCurrentWeatherEndpoint(city);
  
    fetch(currentWeatherEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Vom extrage datele de interes de pe am primit de la API (care ne-a trimis raspunsul sub forma de obiect): name, dt, main, weather, wind
        const { name, dt, main, weather, wind } = data;
        //   Functia getDayOfTheWeekeste un utilar creat de noi
        const day = getDayOfTheWeek(dt);
        const hours = getHour(dt);
        const temperature = Math.round(main.temp);
        const realFeel = Math.round(main.feels_like);
        // Atentie - proprietatea weather este un array cu un singur element
        const weatherDescription = weather[0].description;
        // getWeatherIcon si windToKmPerHour sunt create de noi, in utils/weather
        const weatherIcon = getWeatherIcon(weather[0].icon);
        const windSpeed = Math.round(windToKmPerHour(wind.speed));
  
        // Afisam datele primite si fomrate mai sus in pagina:
        // Pentu asta prima data va trebui sa scriem un selector de JavaScript care
        // acceseaza elementul de DOM
        let currentWeatherContainer = document.querySelector(".current-weather");
        // Al 2 lea pas: folosind proprietatea innerHTML de pe variabila care a accesat elementul de DOM -> inseram datele:
        currentWeatherContainer.innerHTML = `
        <div class= "px-3">
            <div class="fs-2 mb-2"><strong>${name}</strong></div>
            <div class="fs-4"><strong>${day}</strong>, ${hours}</div>
            <div class="d-flex align-items-center justify-content-center">
                  <strong class="fs-1">${temperature}°C</strong>
                  <img src="${weatherIcon}">
            </div>
         </div>
        <div class="px-3">
              <p class="fs-5">Real feel: <strong>${realFeel}°C</strong></p>
              <p class="fs-5 text-capitalize">${weatherDescription}</p>
              <p class="fs-5">Vant: <strong>${windSpeed} km/h</strong></p>
        </div>
      `;
      });
  }