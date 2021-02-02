import express from 'express';
const router = express.Router();
import { promises as fs, write } from 'fs';

global.fileName = 'accounts.json';

const { readFile, writeFile } = fs;

//cria usuário
router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    if (!account.name || account.balance == null) {
      throw new Error('Account e balance estão errados.');
    }

    //cria um objeto id, insere o id que seria o próximo,
    //incrementa o nextId e adiciona o resto das info nessa nova account
    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next(err);
  }
});

//todos registros da api
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    //const { id, name, balance } = data;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    //armazena os dados do body
    const account = req.body;

    if (!account.id || !account.name || account.balance === null) {
      throw new Error('Id, Account e balance estão incorretos.');
    }

    //busca o index dos dados que seja alterar
    const index = data.accounts.findIndex((index) => index.id === account.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    //substitui os dados nesse índice pelos dados que deseja alterar
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    //armazena os dados do body
    const account = req.body;

    if (!account.id || account.balance === null) {
      throw new Error('Id e balance estão incorretos.');
    }

    //busca o index dos dados que seja alterar
    const index = data.accounts.findIndex((index) => index.id === account.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    //substitui os dados nesse índice pelos dados que deseja alterar
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
