// Estado da aplicação

let tabCountries = null;
let tabFavorites = null;

let AllCountries = [];
let FavoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');
  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json(res);
  AllCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population: population,
      formattedPopulation: formatNumber(population),
      flag: flag,
    };
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  AllCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const countryHTML = `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-light btn">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}">
                </div>
                <div>
                    <ul>
                        <li>
                            ${name}
                        </li>
                        <li>
                            ${formattedPopulation}
                        </li>
                    </ul>
                </div>
            </div>
        `;
    countriesHTML += countryHTML;
  });

  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  FavoriteCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const favoriteCountryHTML = `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-light btn">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}">
                </div>
                <div>
                    <ul>
                        <li>
                            ${name}
                        </li>
                        <li>
                            ${formattedPopulation}
                        </li>
                    </ul>
                </div>
            </div>
        `;
    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += '</div>';

  tabFavorites.innerHTML = favoritesHTML;
  console.log(name);
}

function renderSummary() {
  countCountries.textContent = AllCountries.length;
  countFavorites.textContent = FavoriteCountries.length;

  const totalPopulation = AllCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);

  const totalFavorites = FavoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  //pega a nodelist dos buttons em tabcountries e coloca em array para ordenar
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = AllCountries.find((country) => {
    country.id === id;
  });

  FavoriteCountries = [...FavoriteCountries, countryToAdd];

  FavoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  AllCountries = AllCountries.filter((country) => {
    country.id !== id;
  });

  console.log(FavoriteCountries);
  console.log(countryToAdd);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = FavoriteCountries.find((country) => {
    country.id === id;
  });

  AllCountries = [...AllCountries, countryToRemove];

  AllCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  FavoriteCountries = FavoriteCountries.filter((country) => {
    country.id !== id;
  });

  console.log(AllCountries);
  console.log(countryToRemove);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
