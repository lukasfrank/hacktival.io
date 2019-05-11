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

module.exports = {
    setLight
};
