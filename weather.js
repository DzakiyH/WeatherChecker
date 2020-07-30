class Weather {
    constructor(city, state) {
        this.apiKey = 'a8f209ccbabf3e3c76446fef40b9b0cb';
        this.city = city;
        this.state = state;
    }

    // Fetch API
    async getWeather() {
        const respon = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&units=metric&appid=${this.apiKey}`);
        const resData = respon.json();

        return resData
    }

    // Change weather loc
    changeLocation(city, state) {
        this.city = city;
        this.state = state;
    }
}