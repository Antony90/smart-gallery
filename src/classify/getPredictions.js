import axios from "axios";

const proxy = "http://localhost:5000";

async function getPredictions(images) {
    return await axios.post(proxy + "/classify", { images })
        .then(resp => resp.data.tags)
        .then(tags => tags.map(tag => tag[0].toUpperCase() + tag.substring(1)))
//         .catch(error => {
//             var msg;
//             if (error.response) {
//                 msg = error.response.data;
//             } else if (error.request) {
//                 msg = error.request;
//             } else {
//                 msg = error.message;
//             }

//             toast.update(predictionToast, { 
//                 type: 'error', 
//                 render: `Error: ${msg}`, 
//                 isLoading: false, 
//                 autoClose: 3000 
//             });
            
//         })
}

export default getPredictions;