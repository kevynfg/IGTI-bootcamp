import { promises as fs } from 'fs';

let listaEstados = [];
let listaCidades = [];

main();

async function main() {
  await criarJsons();
  //await QtdCidadesPorUF('TO');
  await cidadeComMaisLetras();
  //Tire o comentário da function debaixo se quiser cidades com menos letras
  //await cidadeComMaisLetras('menor');
  await estadosComMaisCidades();
  await cidadeComMaisLetrasDeTodas('menor');
}

async function criarJsons() {
  try {
    listaEstados = JSON.parse(await fs.readFile('Estados.json'));
    //console.log(listaEstados);
    listaCidades = JSON.parse(await fs.readFile('Cidades.json'));
    //console.log(listaCidades);

    for (let i = 0; i < listaEstados.length; i++) {
      let index = listaCidades.filter(
        (cidade) => cidade.Estado === listaEstados[i].ID
      );
      //console.log(index);
      await fs.writeFile(
        `./UF/${listaEstados[i].Sigla}.json`,
        JSON.stringify(index)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function QtdCidadesPorUF(string) {
  try {
    const data = JSON.parse(await fs.readFile(`./UF/${string}.json`));
    //console.log(data.length);
    return data.length;
  } catch (error) {
    console.log(error);
  }
}

async function BuscarCidadesPorUF(string) {
  try {
    let cidades = [];
    const data = JSON.parse(await fs.readFile(`./UF/${string}.json`));
    //console.log(data.length);
    for (let cidade of data) {
      cidades.push(cidade.Nome);
    }
    return cidades;
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
      const count = await QtdCidadesPorUF(estado.Sigla);
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
//prettier-ignore
async function cidadeComMaisLetras(menor) {
  try {
    const estados = JSON.parse(await fs.readFile('Estados.json'));
    let arrayDeCidades = []
    for (let estado of estados) {
      const JsonEstados = JSON.parse(
        await fs.readFile(`./UF/${estado.Sigla}.json`)
      );
      const {Nome} = JsonEstados.reduce((prevCidade, CurrentCidade) => {
        if (!menor) {
          if (prevCidade.Nome.length > CurrentCidade.Nome.length)
            return prevCidade;
          return CurrentCidade;
        } else {
          if (prevCidade.Nome.length < CurrentCidade.Nome.length)
            return prevCidade;
          return CurrentCidade;
        }
      })
      arrayDeCidades.push(Nome + ' - ' + estado.Sigla)
    }
    
    arrayDeCidades.sort((a, b) => a.length - b.length)
    console.log(`Cidades com maiores nomes de cada estado`, arrayDeCidades)

  } catch (error) {
    console.error('Deu ruim', error);
  }
}

async function cidadeComMaisLetrasDeTodas(menor) {
  try {
    const estados = JSON.parse(await fs.readFile('Estados.json'));
    const arrayDeCidades = {
      nomes: [],
    };
    for (let estado of estados) {
      const JsonEstados = JSON.parse(
        await fs.readFile(`./UF/${estado.Sigla}.json`)
      );
      const { Nome } = JsonEstados.reduce((prevCidade, CurrentCidade) => {
        if (!menor) {
          if (prevCidade.Nome.length > CurrentCidade.Nome.length)
            return prevCidade;
          return CurrentCidade;
        } else {
          if (prevCidade.Nome.length < CurrentCidade.Nome.length)
            return prevCidade;
          return CurrentCidade;
        }
      });

      //Armazena os nomes das cidades de todos os Json dos Estados em um único array
      arrayDeCidades.nomes.push(`${Nome} - ${estado.Sigla}`);
    }
    const cidadeNomeMaior = arrayDeCidades.nomes.reduce(
      (prevCidade, CurrentCidade) => {
        if (!menor) {
          if (prevCidade.length > CurrentCidade.length) return prevCidade;
          return CurrentCidade;
        } else {
          if (prevCidade.length < CurrentCidade.length) return prevCidade;
          return CurrentCidade;
        }
      }
    );
    arrayDeCidades.nomes.sort((a, b) => a.nomes - b.nomes);
    if (!menor) {
      console.log(
        `Cidade com maior nome dentre os estados: ${cidadeNomeMaior}`
      );
    } else {
      console.log(
        `Cidade com menor nome dentre os estados: ${cidadeNomeMaior}`
      );
    }
  } catch (error) {
    console.error('Deu ruim', error);
  }
}
