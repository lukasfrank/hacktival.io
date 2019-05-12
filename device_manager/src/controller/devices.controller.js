const axios = require('axios/index');
const cloudinary = require('cloudinary').v2;

cloudinary.config();

const setLight = (url, status) => {
    const endpoint =  status === 'on' ? 'enabletorch' : 'disabletorch';

    axios.get(url.concat('/', endpoint))
        .then(() => {
            console.log(`Device: ${url} : ${status}`);
        })
        .catch(() => {
            console.log(`Device: ${url} not reachable`);
        });
};

const getPhoto = (url) => {
    const endpoint =  'photo.jpg';


    return axios
        .get(url.concat('/', endpoint), {
            responseType: 'arraybuffer'
        })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
            .then(data => "data:image/png;base64,"+ data.toString("base64"))
            .then(data => {
                return cloudinary.uploader.upload(data, function(error, result) {
                    return result;
                });
            })
            .catch(() => {
                console.log(`Device: ${url} not reachable`);
            });
};

module.exports = {
    setLight,
    getPhoto
};
