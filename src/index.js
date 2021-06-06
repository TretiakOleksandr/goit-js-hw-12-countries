import debounce from 'lodash.debounce';

import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';

// const refs = {
//     containerEl: document.querySelector('.js-container'),
// }

// console.log(refs.containerEl);
const containerEl = document.querySelector('.js-container');
const searchEl = document.querySelector('.js-input');

searchEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(evt) {
    const countryName = evt.target.value;
    console.log(countryName);
    if (countryName) {
        fetchCountry(countryName)
        .then(renderCountry)
        .catch(err => console.log(err));        
    }
}


function renderCountry(country) {
    const markup = countryCardTpl(country[0]);
    containerEl.innerHTML = markup;    
}

function fetchCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            return response.json();
        });
}