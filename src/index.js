import debounce from 'lodash.debounce';

import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import someCountryTpl from './templates/some-country-list.hbs';

const containerEl = document.querySelector('.js-container');
const searchEl = document.querySelector('.js-input');
const listEl = document.querySelector('.js-list');

searchEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(evt) {
    const countryName = evt.target.value;
    if (countryName) {
        fetchCountry(countryName)
        .then(renderCountry)
        .catch(err => console.log(err));        
    }
}

function renderCountry(country) {
    
    if (country.length === 1) {
        const cardMarkup = countryCardTpl(country[0]);
        containerEl.innerHTML = cardMarkup;
        listEl.innerHTML = "";
    }

    if (country.length < 11 && country.length > 1) {
        const listMarkup = country.map(someCountryTpl).join('');
        listEl.innerHTML = listMarkup;
        containerEl.innerHTML = "";
    }

    if (country.length > 10) {
        containerEl.innerHTML = '<h2>Too many matches found.</h2>'
    }
    
}

function fetchCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            return response.json();
        });
}