const axios = require('axios');

const setLight = (url, status) => {
    const endpoint =  status === 'on' ? 'enabletorch' : 'disabletorch';

    axios.get(url.concat('/', endpoint))
        .then(() => {
            console.log(`Device: ${url} : ${status}`);
        })
        .catch((e) => {
            console.log(`Device: ${url} not reachable`);
        });
};

module.exports = {
    setLight
};
