const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const forcast = new Forcast();
console.log(forcast);

const updateUI = (data) => {
  // const cityDetails = data.cityDetails
  // const cityWeather = data.cityWeather

  //destructure properties
  const { cityDetails, cityWeather } = data;
  //update dummy data in Details

  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

  //update day/night image & icon
  const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = cityWeather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  // remove d-none if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// forcast.updateCity(city)

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get the value of the input
  const city = cityForm.city.value.trim();
  cityForm.reset();

  forcast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forcast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
