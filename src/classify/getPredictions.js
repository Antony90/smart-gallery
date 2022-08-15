import axios from "axios";

const url = "http://localhost:5000";

async function getPredictions(imgBase64List) {
    const data = {
        images: imgBase64List,
    };

    return await axios.post(url + "/classify", data)
        .then(resp => resp.data.tags)
        .catch(error => {
            if (error.response) {
                console.log(error.response.data)
            }
        });
}

export default getPredictions;