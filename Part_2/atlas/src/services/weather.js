import axios from 'axios';


//DONT PUSH INTO GIT
const APIkey = 'e904f28eb3091ef82098eaaf3b321290'

const getWeather = ({city}) => {

    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=' + APIkey
    


    return axios.get(baseURL).then(response => {
        const returnData = {
            temp: (response.data.main.temp - 273).toFixed(2),
            wind: response.data.wind.speed,
            icon: 'https://openweathermap.org/img/wn/' + response.data.weather[0].icon +'@2x.png',
            weather: response.data.weather[0].description

        }
        return returnData
    })
}

export default {getWeather}


