// DOM Elements
const header = document.querySelector('.header');
const form = document.querySelector('.form');
const ipInput = document.querySelector('.form__ip-input');
const submitBtn = document.querySelector('.form__submit');
const ipEl = document.querySelector('#ip');
const locationEl = document.querySelector('#location');
const timezoneEl = document.querySelector('#timezone');
const ispEl = document.querySelector('#isp');
const mapEl = document.querySelector('#map');
const errorVid = document.querySelector('.error-vid');

const api = {
    key: 'at_Ms5M0n5CIXhBR7UQhqNIE2agBZEoa',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    base: 'https://geo.ipify.org/api/v1',
}

const mapboxToken = 'pk.eyJ1IjoibWF0MmphIiwiYSI6ImNrZWd2cmVuNjFncTAycmx0b24xMXYxdWEifQ.Q64m2Dkb1rj_hATV1NQ3gA'
let myMap = L.map(mapEl);

async function getIpInfo(ip = '8.8.8.8') {
    console.log('%cLoading...', 'font-size:30px; font-weight:600; color: orange ');
    const { proxy, base, key } = api;
    try {
        // const response = await axios.get(`${proxy}${base}?apiKey=${key}&ipAddress=${ip}`)
        const response = await axios.get(`${proxy}${base}`, {
            params: {
                apiKey: key,
                ipAddress: ip
            }
        })
        console.log(response.data);
        displayInfo(response.data);
    } catch (error) {
        displayEmpty();
        console.error(error);
    }
}

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
    if (!data) {
        displayEmpty();
        return;
    }

    header.classList.remove('error');
    errorVid.classList.add('hide');
    mapEl.classList.remove('hide');

    const { ip, isp, location } = data;
    const { city, country, region, postalCode, timezone, lat, lng } = location;

    ipEl.innerText = ip;
    locationEl.innerText = `${city}, ${country}, ${postalCode}`;
    timezoneEl.innerText = `UTC ${timezone}`
    ispEl.innerText = isp;

    displayMap(lat, lng);
}

function displayEmpty() {
    header.classList.add('error');

    ipEl.innerText = '-';
    locationEl.innerText = '-';
    timezoneEl.innerText = '-'
    ispEl.innerText = '-';

    errorVid.classList.remove('hide');
    errorVid.play();
    mapEl.classList.add('hide');
};

function setDefault() {
    ipEl.innerText = '1.1.1.1';
    locationEl.innerText = `Sydney, AU, 1001`;
    timezoneEl.innerText = `UTC +10:00`
    ispEl.innerText = 'Cloudflare, Inc.';

    let lat = '-33.8688';
    let lon = '151.209';

    myMap.setView([lat, lon], 13);
    myMap.dragging.enable();
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: `${mapboxToken}`
    }).addTo(myMap);
};
console.clear();
setDefault();

async function handleSubmit(e) {
    e.preventDefault();
    if (!ipInput.value) {
        displayEmpty();
        throw new Error('No address provided');
    }
    await getIpInfo(ipInput.value);
};

form.addEventListener('submit', handleSubmit);

// TODO cant move and drag on map

