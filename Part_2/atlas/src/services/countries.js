import axios from 'axios'

const apiURLAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const apiURLDetail = 'https://studies.cs.helsinki.fi/restcountries/api/name/'



const getAll = () => { 
    return axios.get(apiURLAll)
    .then(response => response.data.map(country => country.name.common));
}

const getInfo = (country) => {
    return axios.get(apiURLDetail + country).then(
        response => {
            const countryObject = {
                name : response.data.name.common, 
                capital : response.data.capital[0],
                languages : Object.values(response.data.languages),
                flag : response.data.flags.png,
                area : response.data.area
            }
            return countryObject
        }
    )

}

export default {getAll , getInfo}
