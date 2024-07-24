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

  const url1 = `${serverUrl}?q=${formInput.value}&units=metric&appid=${apiKey}`

  fetch(url1)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      cityName.textContent = data.name
      feelsLike.textContent = Math.round(data.main.feels_like)
      sunrise.textContent = data.sys.sunrise
      sunset.textContent = data.sys.sunset
      tempDegrees.textContent = Math.round(data.main.temp)

      if (iconNames[data.main]) {
        img.src = `./img/weather/${iconNames[data.main]}.svg`
      }

      console.log(data)

      addCityName.addEventListener('click', addLike)

      if (dataCity.includes(data.name)) {
        svgLike.classList.add('like')
      } else {
        svgLike.classList.remove('like')
      }
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

  const nameCity = text
  newButtonText.textContent = nameCity

  const url2 = `${serverUrl}?q=${nameCity.value}&units=metric&appid=${apiKey}`

  fetch(url2)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      cityName.textContent = data.name
      feelsLike.textContent = Math.round(data.main.feels_like)
      console.log(data)
    })
}
