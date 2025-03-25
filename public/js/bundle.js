import "@babel/polyfill";
import $iniLV$axios from "axios";
import $iniLV$dotenv from "dotenv";

/* eslint-disable */ 
var $f6b1c9ed51ec7162$exports = {};
/* eslint-disable */ const $f6b1c9ed51ec7162$var$locations = JSON.parse(document.getElementById('map').dataset.locations);
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFnZW5hLWphZG8iLCJhIjoiY2xteXA3NTRiMDZ3ZDJqbGtreDR5ZXp1cyJ9.0F-gtJRb45WF3Y59qZ3a0Q';
var $f6b1c9ed51ec7162$var$map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hagena-jado/clmypnrqp02ry01nz8gre8j8g',
    scrollZoom: false
});
const $f6b1c9ed51ec7162$var$bounds = new mapboxgl.LngLatBounds();
$f6b1c9ed51ec7162$var$locations.forEach((loc)=>{
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo($f6b1c9ed51ec7162$var$map);
    // Add popup
    new mapboxgl.Popup({
        offset: 30
    }).setLngLat(loc.coordinates).setHTML(`<P>Day ${loc.day}: ${loc.description}</P>`).addTo($f6b1c9ed51ec7162$var$map);
    // Extend map bounds to include current location
    $f6b1c9ed51ec7162$var$bounds.extend(loc.coordinates);
});
$f6b1c9ed51ec7162$var$map.fitBounds($f6b1c9ed51ec7162$var$bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});


var $e33d9ff231aec008$exports = {};
/* eslint-disable*/ // DOM elements
const $e33d9ff231aec008$var$loginForm = document.querySelector('.form--login');
const $e33d9ff231aec008$var$logOutBtn = document.querySelector('.nav__el--logout');
const $e33d9ff231aec008$var$userDataForm = document.querySelector('.form-user-data');
const $e33d9ff231aec008$var$userPasswordForm = document.querySelector('.form-user-password');
const $e33d9ff231aec008$var$hideAlert = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
// type is 'success' or 'error'
const $e33d9ff231aec008$var$showAlerts = (type, msg)=>{
    $e33d9ff231aec008$var$hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($e33d9ff231aec008$var$hideAlert, 5000);
};
const $e33d9ff231aec008$var$login = async (email, password)=>{
    try {
        res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            $e33d9ff231aec008$var$showAlerts('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        $e33d9ff231aec008$var$showAlerts('error', err.response.data.message);
    }
};
if ($e33d9ff231aec008$var$loginForm) $e33d9ff231aec008$var$loginForm.addEventListener('submit', (e)=>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    $e33d9ff231aec008$var$login(email, password);
});
const $e33d9ff231aec008$var$logout = async ()=>{
    try {
        const res1 = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        res1.data.status = 'success';
        location.reload(true);
    } catch (err) {
        $e33d9ff231aec008$var$showAlerts('error', 'Error logging out! Try again');
    }
};
if ($e33d9ff231aec008$var$logOutBtn) $e33d9ff231aec008$var$logOutBtn.addEventListener('click', $e33d9ff231aec008$var$logout);
const $e33d9ff231aec008$var$updateSettings = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res1 = await axios({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res1.data.status === 'success') $e33d9ff231aec008$var$showAlerts('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        $e33d9ff231aec008$var$showAlerts('error', err.response.data.message);
    }
};
if ($e33d9ff231aec008$var$userDataForm) $e33d9ff231aec008$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    $e33d9ff231aec008$var$updateSettings(form, 'data');
});
if ($e33d9ff231aec008$var$userPasswordForm) $e33d9ff231aec008$var$userPasswordForm.addEventListener('submit', async (e)=>{
    document.querySelector('.btn--save-password').textContent = 'updating...';
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await $e33d9ff231aec008$var$updateSettings({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});


/* eslint-disable */ 
/*eslint-disable*/ const $1eb0cc260df27e1b$var$hideAlert = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $1eb0cc260df27e1b$export$de026b00723010c1 = (type, msg)=>{
    $1eb0cc260df27e1b$var$hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($1eb0cc260df27e1b$var$hideAlert, 5000);
};


const $a7bd2b0e83ecbd10$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res = await (0, $iniLV$axios)({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') (0, $1eb0cc260df27e1b$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)('error', err.response.data.message);
    }
};


/* eslint-disable */ 


// Load environment variables
(0, $iniLV$dotenv).config();
const $245ad133cda49593$var$stripe = Stripe(process.env.STRIPE_KEY);
const $245ad133cda49593$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get checkout session from API
        const session = await (0, $iniLV$axios)({
            method: 'POST',
            url: `/api/v1/bookings/checkout-session/${tourId}`
        });
        // console.log(session);
        // 2) Create checkout form + chanre credit card
        await $245ad133cda49593$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)('error', err);
    }
};



// DOM ELEMENTS
const $1cd085a7ac742057$var$mapBox = document.getElementById('map');
const $1cd085a7ac742057$var$loginForm = document.querySelector('.form--login');
const $1cd085a7ac742057$var$logOutBtn = document.querySelector('.nav__el--logout');
const $1cd085a7ac742057$var$userDataForm = document.querySelector('.form-user-data');
const $1cd085a7ac742057$var$userPasswordForm = document.querySelector('.form-user-password');
const $1cd085a7ac742057$var$bookBtn = document.getElementById('book-tour');
// DELEGATION
if ($1cd085a7ac742057$var$mapBox) {
    const locations = JSON.parse($1cd085a7ac742057$var$mapBox.dataset.locations);
    (0, $f6b1c9ed51ec7162$exports.displayMap)(locations);
}
if ($1cd085a7ac742057$var$loginForm) $1cd085a7ac742057$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $e33d9ff231aec008$exports.login)(email, password);
});
if ($1cd085a7ac742057$var$logOutBtn) $1cd085a7ac742057$var$logOutBtn.addEventListener('click', (0, $e33d9ff231aec008$exports.logout));
if ($1cd085a7ac742057$var$userDataForm) $1cd085a7ac742057$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    (0, $a7bd2b0e83ecbd10$export$f558026a994b6051)(form, 'data');
});
if ($1cd085a7ac742057$var$userPasswordForm) $1cd085a7ac742057$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $a7bd2b0e83ecbd10$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($1cd085a7ac742057$var$bookBtn) $1cd085a7ac742057$var$bookBtn.addEventListener('click', (e)=>{
    e.target.textContent = 'Processing...';
    const { tourId: tourId } = e.target.dataset;
    (0, $245ad133cda49593$export$8d5bdbf26681c0c2)(tourId);
});
const $1cd085a7ac742057$var$alertMessage = document.querySelector('body').dataset.alert;
if ($1cd085a7ac742057$var$alertMessage) (0, $1eb0cc260df27e1b$export$de026b00723010c1)('success', $1cd085a7ac742057$var$alertMessage, 20);


//# sourceMappingURL=bundle.js.map
