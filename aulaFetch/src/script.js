window.addEventListener('load', () => {
  fetch('https://api.github.com/users/kevynfg')
    .then((res) => {
      res.json().then((dados) => {
        showData(dados);
      });
    })
    .catch((error) => {
      console.log('Error');
    });

  fetchAsync();
});

function showData(data) {
  const user = document.querySelector('div#user');
  user.textContent = `${data.login} ${data.name}`;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('não é possível dividir 0');
    }
    resolve(a / b);
  });
}

async function divisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

async function fetchAsync() {
  const res = await fetch('https://api.github.com/users/kevynfg');
  const json = await res.json();
  console.log(json);
}
