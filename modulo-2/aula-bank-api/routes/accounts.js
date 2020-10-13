import express from 'express';
const router = express.Router();
import { promises as fs } from 'fs';

global.fileName = 'accounts.json';

const { readFile, writeFile } = fs;

//cria usuário
router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    //cria um objeto id, insere o id que seria o próximo,
    //incrementa o nextId e adiciona o resto das info nessa nova account
    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//todos registros da api
router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    //const { id, name, balance } = data;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
