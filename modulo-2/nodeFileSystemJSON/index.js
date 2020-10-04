import { promises as fs, write } from 'fs';

writeReadJson();

async function writeReadJson() {
  try {
    const arrayCarros = ['Palio', 'Sandero', 'Celta'];
    const arrayMotos = { motos: ['Feizer', 'BMW', 'Twist'] };
    const financiadoras = { financiador: ['Itaú', 'Nubank'] };
    const concessonaria = {
      carros: arrayCarros,
    };

    Object.assign(concessonaria, arrayMotos);
    Object.assign(concessonaria, financiadoras);

    await fs.writeFile('teste.json', JSON.stringify(concessonaria));
    const data = JSON.parse(await fs.readFile('teste.json'));

    console.log(data);
    console.log(concessonaria);
  } catch (err) {
    console.log(err);
  }
}
