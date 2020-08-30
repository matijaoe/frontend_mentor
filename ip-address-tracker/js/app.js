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

const mapboxToken = 'pk.eyJ1IjoibWF0MmphIiwiYSI6ImNrZWd2cmVuNjFncTAycmx0b24xMXYxdWEifQ.Q64m2Dkb1rj_hATV1NQ3gA'
let myMap = L.map(mapEl);

const api = {
    // don't even think about it 👇
    key: 'at_Ms5M0n5CIXhBR7UQhqNIE2agBZEoa',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    base: 'https://geo.ipify.org/api/v1',
}

// Fetch IP data
async function getIpData(ip = '1.1.1.1') {
    console.log('%cLoading...', 'font-size:30px; font-weight:600; color: orange ');
    const { proxy, base, key } = api;

    try {
        // TODO fetch by domain
        const response = await axios.get(`${proxy}${base}`, {
            params: {
                apiKey: key,
                ipAddress: ip,
                // domain: ip
            }
        })
        console.log('IP DATA: ', response.data);
        displayInfo(response.data);
    } catch (error) {
        displayError();
        console.error(error);
    }
}

// Draw map
function drawMap(lat, lon) {
    myMap.setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: `${mapboxToken}`
    }).addTo(myMap);

    const locationIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [23, 56],
    })
    L.marker([lat, lon], {
        icon: locationIcon,
    }).addTo(myMap);

}

// Display IP info
function displayInfo(data) {
    header.classList.remove('error');
    errorVid.classList.add('hide');
    mapEl.classList.remove('hide');

    const { ip, isp, location } = data;
    const { city, country, region, postalCode, timezone, lat, lng } = location;

    clearInput();
    ipInput.blur();
    ipEl.innerText = ip;
    locationEl.innerText = `${city}, ${country}, ${postalCode}`;
    timezoneEl.innerText = `UTC ${timezone}`
    ispEl.innerText = isp;

    drawMap(lat, lng);

}

function displayError() {
    header.classList.add('error');

    ipEl.innerText = '-';
    locationEl.innerText = '-';
    timezoneEl.innerText = '-'
    ispEl.innerText = '-';

    errorVid.classList.remove('hide');
    errorVid.play();
    mapEl.classList.add('hide');

    ipInput.value = 'No IP found';
    ipInput.blur();
    ipInput.addEventListener('focus', () => {
        clearInput();
    })
};

function clearInput() {
    ipInput.value = '';
    submitBtn.disabled = false;
}

function setDefault() {
    ipEl.innerText = '1.1.1.1';
    locationEl.innerText = `Sydney, AU, 1001`;
    timezoneEl.innerText = `UTC +10:00`
    ispEl.innerText = 'Cloudflare, Inc.';
    let lat = '-33.8688';
    let lon = '151.209';

    drawMap(lat, lon)
};
console.clear();
setDefault();

async function handleSubmit(e) {
    e.preventDefault();
    submitBtn.disabled = true;

    if (!ipInput.value) {
        displayError();
        // todo uncaught for some reason
        throw new Error('No address provided');
    }

    await getIpData(ipInput.value);
};

form.addEventListener('submit', handleSubmit);



