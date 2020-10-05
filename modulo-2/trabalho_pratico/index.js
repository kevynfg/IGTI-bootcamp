import { kStringMaxLength } from 'buffer';
import { promises as fs } from 'fs';
import readLine from 'readline';

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let listaEstados = [];
let listaCidades = [];

Init();

async function Init() {
  await criarFolders();
  await buscarUF('RN');
}

async function criarFolders() {
  try {
    listaEstados = JSON.parse(await fs.readFile('Estados.json'));
    //console.log(listaEstados);
    listaCidades = JSON.parse(await fs.readFile('Cidades.json'));
    //console.log(listaCidades);

    for (let i = 0; i < listaEstados.length; i++) {
      let index = listaCidades.filter(
        (cidade) => cidade.Estado === listaEstados[i].ID
      );
      console.log(index);
      await fs.writeFile(
        `./UF/${listaEstados[i].Sigla}.json`,
        JSON.stringify(index)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function buscarUF(string) {
  try {
    const filtrarUF = listaEstados.map((estado) => {
      return {
        Sigla: estado.Sigla,
      };
    });
    rl.question(
      'Digite o UF de estado que deseja buscar, ou digite sair: ',
      async (string) => {
        try {
          if (string.toLocaleLowerCase() === 'sair') {
            rl.close();
          } else {
            const data = JSON.parse(await fs.readFile(`./UF/${string}.json`));
            console.log(data);
            buscarUF();
          }
        } catch (error) {
          error = 'UF inválido.';
          console.log(error);
          buscarUF();
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
