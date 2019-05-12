const axios = require('axios/index');

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

    return axios.get(url.concat('/', endpoint))
        .then((data) => {
            console.log(`Device: ${url} : ${data}`);
            return data;
        })
        .catch(() => {
            console.log(`Device: ${url} not reachable`);
        });
};

module.exports = {
    setLight,
    getPhoto
};
