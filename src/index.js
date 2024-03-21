const form = document.querySelector('#search-form');
const input = document.querySelector('#search-form-input');
const city = document.querySelector('#city');
const timeElement = document.querySelector('#time');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#icon');
const forecast = document.querySelector('#forecast');

const apiKey = 'cbofbec7cf9d3c845e0da48b7238784t';

function getTime(timestamp){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
    let time = new Date(timestamp * 1000);
    let day = days[time.getDay()];
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (hours < 10) {
        hours = "0"+hours
    }
    if (minutes < 10) {
        minutes = "0"+minutes
    }

    return [day, hours, minutes]
}

function displayForecast (responce){
    forecast.innerHTML = '';
    const resp = responce.data.daily;
    console.log(responce.data.daily[0].temperature)
    for(let i=0; i < 5; i++){
        let[day] = getTime(resp[i].time);
        const div = document.createElement("div");

        div.className = 'col d-flex flex-column align-items-center';
        div.innerHTML = `
        <p class="text-secondary">${day}</p>
        <img src="${resp[i].condition.icon_url}" alt="weather-img">
        <div>
        <span class="text-danger"><strong>${Math.round(resp[i].temperature.maximum)}º</strong></span>
        <span class="text-danger">${Math.round(resp[i].temperature.minimum)}º</span>
        </div>        
        `
        forecast.appendChild(div);
    }

}

function proceedData(responce){
    const resp = responce.data;
    city.innerHTML = responce.data.city;
    let [day, hours, minutes] = getTime(resp.time);


    timeElement.innerHTML = `${day} ${hours}:${minutes}`;
    description.innerHTML = resp.condition.description;
    humidity.innerHTML = `<strong>${resp.temperature.humidity}%</strong>`;
    windSpeed.innerHTML = `<strong>${resp.wind.speed}km/h</strong>`;
    temperature.innerHTML = `<strong>${Math.round(resp.temperature.current)}%C</strong>`;
    weatherIcon.src = resp.condition.icon_url;

}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input.value}&key=${apiKey}&units=metric`;
    let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${input.value}&key=${apiKey}`;

    axios.get(apiUrl).then(proceedData)
    axios.get(apiForecastUrl).then(displayForecast)
})






