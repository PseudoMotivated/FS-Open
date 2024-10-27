import axios from 'axios'

const baseUrl1 = "https://nominatim.openstreetmap.org/search.php?q="
const baseUrl2 = "&format=jsonv2"

const getGeoCoding = ({ query }) => {
    console.log(baseUrl1 + query + baseUrl2)
    return axios.get(baseUrl1 + query + baseUrl2)
    .then(response => {
        const geoCode = {lat: response.data[0].lat , lon: response.data[0].lon}
        return (geoCode)
    })
  }
export default {getGeoCoding}

