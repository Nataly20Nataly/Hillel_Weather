let objSel = document.querySelector(`.form-select`)

let createdCity = [`Kiev`, "Moscow", "London", "Tokyo", "Madrid"]

function selectedCity() {
  createdCity.forEach((item) => {
    let el = document.createElement(`option`)
    objSel.append(el)
    el.textContent = item
    el.value = item
  })
}
selectedCity(createdCity)

async function getWeather() {
  let response = await fetch(
    `http://api.weatherstack.com/current?access_key=b77c7564954ed5ea00c7ec440098cd00&query=${objSel.value}`
  )
  return response.json()
}


function infoCityWeather(
  {
    request: {
 current: {
      observation_time: timeCity,
      weather_descriptions: condition,
      weather_icons: img,
      temperature: degrees,
    },
 location: { 
      name: city, 
      country: country }
    },
}
) {
  let cardTime = document.querySelector(`.card-title:first-child`)
  cardTime.textContent = `Time - ${timeCity} - ${condition}`
  let cardTextTemp = document.querySelector(`.card-text:nth-child(2)`)
  cardTextTemp.textContent = `Temperature: ${degrees}`
  let cardTextLoc = document.querySelector(`.card-title:last-child`)
  cardTextLoc.textContent = city + `, ` + country
  let image = document.querySelector(`.card-img-top`)
  image.scr = img
}


async function InfoWeatherInCard(){
    let data = await getWeather()
}



