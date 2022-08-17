import axios from "axios";

const proxy = "http://localhost:5000";

function getPredictions(images) {
    return axios.post(proxy + "/classify", { images })
        .then(resp => resp.data.tags)
}

export default getPredictions;