// Init Storage object
const storage = new Storage;
// Get Stored Location data
const weatherLocation = storage.getLocationData();

// Init Weather Object
const weather = new Weather(weatherLocation.city, weatherLocation.state);
// Get location for UI
const loc = weather.city + ", " + weather.state;

// Init UI object
const ui = new UI;

// Load local data for opening the first time
document.addEventListener('DOMContentLoaded', (e) => {
    getWeather(loc);
});

// give option to state option in the modal
document.getElementById('change-button').addEventListener('click', ui.modalState());

// give option to city option after user choose a state
document.getElementById('state').addEventListener('change', (e) => {
    const val = e.target.value;
    ui.modalCity(val);
});

// Change Location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

    if(city === 'None' || state === 'None') {
        // Creating paragraph for the warning
        const warnUI = document.createElement('p');
        warnUI.className = 'choose-warning text-danger';
        warnUI.appendChild(document.createTextNode('Please choose both state and city'));
        
        //putting in modal
        const parentForm = document.getElementById('w-form');
        parentForm.appendChild(warnUI);

        // timout for the warning to disappear
        setTimeout(() => {
            document.querySelector('.choose-warning').remove();
        }, 2000);
    } else {
        // processing the input

        city = city.split(" ")[1];
        state = state.slice(1,3);

        weather.changeLocation(city, state);

        // Set Location in LS
        storage.setLocationData(city, state);

        // Get and Display Weather
        const loc = `${city}, ${state}`;
        getWeather(loc);

        //Close Modal
        $('#locModal').modal('hide');
    }
});

// taking the weather data and displaying it in the web
function getWeather(loc) {
    weather.getWeather()
    .then(result => {
        ui.paint(result, loc);
    })
    .catch(err => console.log(err));
}