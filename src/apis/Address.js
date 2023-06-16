import axios from "axios" 

export default axios.create({
    baseURL: 'https://us1.locationiq.com/v1/search?key=pk.b89f5a28b6b6a48c2cfcbb27d3eb7899&q='
})

