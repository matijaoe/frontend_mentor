
// DOM Elements
const form = document.querySelector('.form');
const ipInput = document.querySelector('.form__ip-input');
const submitBtn = document.querySelector('.form__submit');
const ipEl = document.querySelector('#ip');
const locationEl = document.querySelector('#location');
const timezoneEl = document.querySelector('#timezone');
const ispEl = document.querySelector('#isp');
let myMap = L.map('map');

const api = {
    key: 'at_Ms5M0n5CIXhBR7UQhqNIE2agBZEoa',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    baseUrl: 'https://geo.ipify.org/api/v1',
}


document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${api.proxy}https://ipapi.co/json/`)
        .then(data => {
            const myIp = data.data.ip;
            console.log(data.data)
            getIpInfo(myIp)
        })

});


async function getIpInfo(ip = '192.212.174.101') {
    const { proxy, baseUrl, key } = api;
    try {
        const response = await axios.get(`${api.proxy}${baseUrl}?apiKey=${key}&ipAddress=${ip}`)
        console.log(response.data);
        displayInfo(response.data)
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

myMap.setView([lat, lon], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${mapboxToken}`
}).addTo(myMap);

function displayMap(lat, lon) {
    myMap.setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: `${mapboxToken}`
    }).addTo(myMap);
}

function displayInfo(data) {
    const { ip, isp, location } = data;
    const { city, country, region, postalCode, timezone, lat, lng } = location;


    ipEl.innerText = ip;
    locationEl.innerText = `${city}, ${country}, ${postalCode}`;
    timezoneEl.innerText = `UTC ${timezone}`
    ispEl.innerText = isp;
    displayMap(lat, lng)
}

