
// DOM Elements
const form = document.querySelector('.form');
const ipInput = document.querySelector('.form__ip-input');
const submitBtn = document.querySelector('.form__submit');
const ipEl = document.querySelector('#ip');
const locationEl = document.querySelector('#location');
const timezoneEl = document.querySelector('#timezone');
const ispEl = document.querySelector('#isp');

const api = {
    keyOG: 'at_Ms5M0n5CIXhBR7UQhqNIE2agBZEoa',
    key: 'at_95EQQjQ0h1brmuaMeVmKX6OO99ajO',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    baseUrl: 'https://geo.ipify.org/api/v1',
}



document.addEventListener('load', () => {
    // axios.get(`${api.proxy}https://ipapi.co/json/`)
    //     .then(data => console.log(data.ip))
    // axios.get(`${api.proxy}https://ipapi.co/json/`)
    //     .then(data => console.log(data.ip))
});


async function getIpInfo(ip = '192.212.174.101') {
    const { proxy, baseUrl, key } = api;
    try {
        const response = await axios.get(`${proxy}${baseUrl}`, {
            apiKey: key,
            ipAddress: ip
        })
        // const response = await axios.get(`${api.proxy}${baseUrl}?apiKey=${key}&ipAddress=${ip}`)
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!ipInput) {
        throw new Error('No address provided')
    }
    getIpInfo(ipInput.value);
    console.log('submitted');
})

const mapboxToken = 'pk.eyJ1IjoibWF0MmphIiwiYSI6ImNrZWd2cmVuNjFncTAycmx0b24xMXYxdWEifQ.Q64m2Dkb1rj_hATV1NQ3gA'
let lat = '51.505';
let lon = '-0.09';

let mymap = L.map('map').setView([lat,lon], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${mapboxToken}`
}).addTo(mymap);