
class Forcast {
    constructor() {
        this.key = 'MAA3w8o0FrV3VU5Z4bWOgyK9dQneKTSC'
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/'
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);

        return { cityDetails, cityWeather };
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0]
    }

    async getWeather(cityKey) {
        const query = `${cityKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0]
    };

}







// getCity('tbilisi')
//     .then(data => {
//         return getWeather(data.Key);
//     }).then(data => {
//         console.log(data)
//     })
//     .catch(err => console.log(err));

