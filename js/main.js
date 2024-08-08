let dataCity = ['Amur', 'Samara', 'Bali', 'Dane', 'Kilo']
let iconNames = {
  Rain: 'rain',
  Clear: 'clear',
  Clouds: 'clouds',
}

const Form = document.querySelector('.form')
const formInput = document.querySelector('.form__input')
const cityName = document.querySelector('.nuances-list__city-text')
const addCityName = document.querySelector('.nuances-list__button')
const cityList = document.querySelector('.city-list')
const svgLike = document.querySelector('.svg-like')
const feelsLike = document.querySelector('.feels-like')
const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')
const tempDegrees = document.querySelector('.nuances-list__temp-degrees')
const nuancesImg = document.querySelector('nuances-list__img')

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

Form.addEventListener('submit', getCityName)
addCityName.addEventListener('click', addCity)

createCityNames()

function getCityName(e) {
  e.preventDefault()

  const url = `${serverUrl}?q=${formInput.value}&units=metric&appid=${apiKey}`

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      cityName.textContent = data.name

      tempDegrees.textContent = Math.round(data.main.temp)

      feelsLike.textContent = Math.round(data.main.feels_like)

      console.log(data)

      addCityName.addEventListener('click', addLike)

      if (dataCity.includes(data.name)) {
        addLike()
      } else {
        svgLike.classList.remove('like')
      }

      const sunriseTimestamp = data.sys.sunrise
      const sunriseDate = new Date(sunriseTimestamp * 1000)
      const sunriseHours = sunriseDate.getHours().toString().padStart(2, '0')
      const sunriseMinutes = sunriseDate
        .getMinutes()
        .toString()
        .padStart(2, '0')
      sunrise.textContent = `${sunriseHours}:${sunriseMinutes}`

      const sunsetTimestamp = data.sys.sunset
      const sunsetDate = new Date(sunsetTimestamp * 1000)
      const sunsetHours = sunsetDate.getHours().toString().padStart(2, '0')
      const sunsetMinutes = sunsetDate.getMinutes().toString().padStart(2, '0')
      sunset.textContent = `${sunsetHours}:${sunsetMinutes}`
    })
}

function addLike() {
  svgLike.classList.add('like')
}

function addCity() {
  const newLi = document.createElement('li')
  newLi.className = 'city-list__item'
  cityList.append(newLi)

  newLi.append(createButtonText(cityName.textContent))
  newLi.append(createButtonDelete())
  dataCity.push(cityName.textContent)

  clearInput()

  newLi.addEventListener('click', getCityText)
}

function createButtonText(text) {
  let newButtonText = document.createElement('button')
  newButtonText.className = 'city-list__button-text'

  const nameCity = text
  newButtonText.textContent = nameCity

  return newButtonText
}

function createButtonDelete() {
  const newButtonDelete = document.createElement('button')
  newButtonDelete.className = 'city-list__button-delete'
  newButtonDelete.textContent = '+'
  newButtonDelete.addEventListener('click', deleteCity)
  return newButtonDelete
}

function clearInput() {
  formInput.value = ''
}

function deleteCity(e) {
  dataCity = dataCity.filter(
    (city) => city !== e.target.previousSibling.textContent
  )
  e.target.parentNode.remove()
}

function createCityNames() {
  dataCity.forEach((city) => {
    const newLi = document.createElement('li')
    newLi.className = 'city-list__item'
    cityList.append(newLi)

    newLi.append(createButtonText(city))
    // newLi.append(createButtonDelete())
  })
}

function getCityText(e) {
  e.preventDefault()

  const nameCity = e.target.textContent
  console.log(e.target)
  const url = `${serverUrl}?q=${nameCity}&units=metric&appid=${apiKey}`

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      cityName.textContent = data.name
      feelsLike.textContent = Math.round(data.main.feels_like)
      // console.log(data)
    })
}
