import { promises as fs } from 'fs';

let listaEstados = [];
let listaCidades = [];

Init();

async function Init() {
  await criarFolders();
  //await buscarUF('TO');
  await estadosComMaisCidades();
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
    const data = JSON.parse(await fs.readFile(`./UF/${string}.json`));
    //console.log(data.length);
    return data.length;
  } catch (error) {
    console.log(error);
  }
}

async function estadosComMaisCidades(mais) {
  try {
    const estados = JSON.parse(await fs.readFile('Estados.json'));
    const lista = [];

    for (let estado of estados) {
      //busco a quantidade de cidades de cada estado
      //passando a sigla para a function que traz a quantidade
      const count = await buscarUF(estado.Sigla);
      lista.push({ uf: estado.Sigla, count });
    }

    lista.sort((a, b) => {
      return a.count - b.count;
    });
    console.log(lista);

    const resultados = [];
    if (mais) {
      lista
        //Extrai os primeiros valores da lista
        .slice(0, 5)
        .forEach((item) => resultados.push(item.uf + ' - ' + item.count));
    } else {
      lista
        //Extrai os últimos valores da lista
        .slice(-5)
        .forEach((item) => resultados.push(item.uf + ' - ' + item.count));
    }
    console.log(resultados.reverse());
  } catch (error) {
    console.log(error);
  }
}
