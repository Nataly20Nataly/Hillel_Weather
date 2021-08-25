let objSel = document.querySelector(`.form-select`)
const key = `b77c7564954ed5ea00c7ec440098cd00`
const url = `http://api.weatherstack.com/current`
let createdCity = [`Kiev`, "Moscow", "London", "Tokyo", "Madrid"]
let card = document.querySelector(`.card`)
card.hidden = true

function selectedCity() {
  createdCity.forEach((item) => {
    let el = document.createElement(`option`)
    objSel.append(el)
    el.textContent = item
    el.value = item
  })
}
selectedCity()

async function getWeather() {
  let response = await fetch(`${url}?access_key=${key}&query=${objSel.value}`)
  return response.json()
}

function infoCityWeather({
  current: {
    observation_time: timeCity,
    weather_descriptions: condition,
    weather_icons: [img],
    temperature: degrees,
  },

  location: { name: city, country: country },
}) {
  let cardTime = document.querySelector(`.card-title:first-child`)
  cardTime.textContent = `Time - ${timeCity} - ${condition}`
  let [cardTextTemp, cardTextLoc] = document.querySelectorAll(`.card-text`)
  cardTextTemp.textContent = `Temperature: ${degrees}`
  cardTextLoc.innerText = city + `, ` + country
  let image = document.querySelector(`.card-img-top`)
  image.src = img
  card.hidden = false
}

objSel.addEventListener(`change`, async (event) => {
  if (isNaN(event.target.value)) {
    let getInfo = await getWeather(event.target.value)
    console.log(getInfo)
    infoCityWeather(getInfo)
  } else {
    card.hidden = true
  }
})
