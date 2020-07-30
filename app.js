// Init Storage object
const storage = new Storage;
// Get Stored Location data
const weatherLocation = storage.getLocationData();

// Init Weather Object
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const loc = weather.city + ", " + weather.state;

// Init UI object
const ui = new UI;

document.addEventListener('DOMContentLoaded', (e) => {
    getWeather(loc);
    ui.modalState();
});

document.getElementById('state').addEventListener('change', (e) => {
    const val = e.target.value;
    ui.modalCity(val);
});

// Change Location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

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
});

function getWeather(loc) {
    weather.getWeather()
    .then(result => {
        ui.paint(result, loc);
    })
    .catch(err => console.log(err));
}