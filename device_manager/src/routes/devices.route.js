const express = require('express');
const router = express.Router();

const { setLight } = require('../controller/devices.controller');

const devices = require('../../devices').devices;

router.post('/devices', (req, res) => {
    const light = req.body.light ? req.body.light : "off";

    devices.forEach(device => setLight(device.url, light));



    res.send('Hello World!')
});

router.get('/devices', (req, res) => {
    res.json(devices.map(data => ({
        ...data,
        url: data.url.concat('/video')
    })))
});

module.exports = router;
