class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.wind = document.getElementById('w-wind');
    }

    paint(weather, currentLoc) {
        this.location.textContent = currentLoc;
        this.desc.textContent = weather.weather[0].description;
        this.string.textContent = weather.main.temp + "\xb0C";
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
        this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}\xb0C`;
        this.wind.textContent = `Wind Speed: ${weather.wind.speed}m/s, Deg: ${weather.wind.deg}\xb0`;
    }

    modalState()  {
        let states;
        fetch('iso-3166-2.json')
        .then(res => res.json())
        .then(data => {
            states = data;
            const option = document.getElementById('state');
            for(let state in states) {
                const sel = document.createElement('option');
                sel.appendChild(document.createTextNode(`(${state}) ${states[`${state}`].name}`));
                option.appendChild(sel);
            }
        });
    }

    modalCity(stateName) {
        const selectParent = document.getElementById('city');
        while(selectParent.lastElementChild) {
            selectParent.removeChild(selectParent.lastElementChild);
        }
        const firstElement = document.createElement('option');
        firstElement.appendChild(document.createTextNode('None'));
        selectParent.appendChild(firstElement);
        let states;
        const stateCode = stateName.slice(1,3);
        const countryName = stateName.slice(5);
        fetch('iso-3166-2.json')
        .then(res => res.json())
        .then(data => {
            states = data[`${stateCode}`].divisions;
            for(let state in states) {
                const sel = document.createElement('option');
                sel.appendChild(document.createTextNode(`(${state}) ${states[`${state}`]}`));
                selectParent.appendChild(sel);            }
        });
    }
}