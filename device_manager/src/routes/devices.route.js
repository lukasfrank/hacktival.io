const express = require('express');
const router = express.Router();

const { setLight } = require('../controller/devices.controller');

const devices = require('../../config').devices;

router.post('/', (req, res) => {
    const light = req.body.light ? req.body.light : "off";

    devices.forEach(device => setLight(device.url, light));

    res.end()
});

router.get('/', (req, res) => {
    res.json(devices.map(data => ({
        ...data,
        url: data.url.concat('/video')
    })))
});

module.exports = router;
