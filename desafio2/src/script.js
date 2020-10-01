let infoSearch = document.querySelector('.info');
let itemsSearch = document.querySelector('.items');
let allPeople = [];
let novoUser = [];
let contagemFem = [];
let contagemMasc = [];
let contagemPessoas = null;
let buttonSearch = document.querySelector('#buttonSearch');
let inputSearch = document.querySelector('#search');

window.addEventListener('load', () => {
  Fetching();
});

async function Fetching() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json(res);

  allPeople = json.results
    .map(({ name, picture, gender, dob }) => {
      return {
        name: `${name.first} ${name.last}`,
        picture: picture.thumbnail,
        gender: gender,
        dob: dob.age,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  allPeople.forEach((user) => {
    const { gender } = user;
    if (gender == 'female') {
      contagemFem = [...contagemFem, gender];
    } else if (gender == 'male') {
      contagemMasc = [...contagemMasc, gender];
    }
  });

  const somaIdade = allPeople.reduce((accumulator, current) => {
    return accumulator + current.dob;
  }, 0);

  showGender(contagemMasc.length, contagemFem.length);
  somaIdades(somaIdade);
  mediaIdades(somaIdade / allPeople.length);
  renderPeople(allPeople);
}

const renderPeople = (peoples) => {
  itemsSearch.innerHTML = '';
  let output = '';
  peoples.forEach((people) => {
    contagemPessoas++;
    const { name, picture, dob } = people;
    output += `
        <tr>
        <td><img src="${picture}"> ${name}, ${dob} anos</td>
        </tr>
        `;
  });
  contagemPessoas = peoples.length;
  itemsSearch.innerHTML = `<tr><th>${contagemPessoas} Usuário(s) foram encontrado(s)</th></tr>`;
  itemsSearch.innerHTML += output;
};

inputSearch.addEventListener('keyup', (event) => {
  contagemFem = [];
  contagemMasc = [];
  if (event.keyCode === 13) {
    contagemPessoas--;
    event.preventDefault();
    const element = event.target.value.toLowerCase();
    novoUser = allPeople
      .filter((name) => name.name.toLowerCase().includes(element))
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    novoUser.forEach((user) => {
      const { gender } = user;
      if (gender == 'female') {
        contagemFem = [...contagemFem, gender];
      } else if (gender == 'male') {
        contagemMasc = [...contagemMasc, gender];
      }
    });

    const somaIdade = novoUser.reduce((accumulator, current) => {
      return accumulator + current.dob;
    }, 0);

    showGender(contagemMasc.length, contagemFem.length);
    somaIdades(somaIdade);
    mediaIdades(somaIdade / novoUser.length);

    if (novoUser.length === 0) {
      infoSearch.innerHTML = 'Não há estatísticas';
      renderPeople(novoUser);
    } else {
      renderPeople(novoUser);
    }
  }
});

function showGender(male, female) {
  let output = '';
  infoSearch.innerHTML = `<tr><th>Estatísticas</th></tr>`;
  output += `<td>Sexo masculino: ${male}</td>`;

  output += `<tr><td>Sexo Feminino: ${female}</td></tr>`;
  infoSearch.innerHTML += output;
}

function somaIdades(idades) {
  let output = '';
  output = `<tr><td>Soma das idades: ${idades}</td></tr>`;
  infoSearch.innerHTML += output;
}

function mediaIdades(idades) {
  let output = '';
  output = `<tr><td>Média das idades: ${idades.toFixed()}</td></tr>`;
  infoSearch.innerHTML += output;
}

function buttonEvent() {
  contagemFem = [];
  contagemMasc = [];
  contagemPessoas--;
  const element = inputSearch.value.toLowerCase();
  novoUser = allPeople
    .filter((name) => name.name.toLowerCase().includes(element))
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  novoUser.forEach((user) => {
    const { gender } = user;
    if (gender == 'female') {
      contagemFem = [...contagemFem, gender];
    } else if (gender == 'male') {
      contagemMasc = [...contagemMasc, gender];
    }
  });

  const somaIdade = novoUser.reduce((accumulator, current) => {
    return accumulator + current.dob;
  }, 0);

  showGender(contagemMasc.length, contagemFem.length);
  somaIdades(somaIdade);
  mediaIdades(somaIdade / novoUser.length);

  if (novoUser.length === 0) {
    infoSearch.innerHTML = 'Não há estatísticas';
    renderPeople(novoUser);
  } else {
    renderPeople(novoUser);
  }
}
