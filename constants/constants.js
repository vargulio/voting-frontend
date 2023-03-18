const PAGE_IDS = ['login', 'register', 'home', 'details'];
const STRONG_PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
const SERVER_URL = 'http://192.168.1.4:8080';

function getEl(id) {
    return document.getElementById(id);
}

function makeAPICall(url, options) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json()
                    .then(data => {
                        return Promise.reject({status: response.status, ...data})
                    })
            }
        })
}

function debounce(action, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(action, delay, ...args);
    }
}