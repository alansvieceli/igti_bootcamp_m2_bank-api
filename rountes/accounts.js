import express from 'express';
import {
  insertAccount,
  selectAccount,
  selectAccountById,
  deleteAccount,
  updateAccount,
} from '../modules/repository.js';

const rounter = express.Router();

rounter.post('/', async (req, res) => {
  const result = await insertAccount(req.body);

  if (result.error !== undefined) {
    res.status(400).send(result);
  } else {
    res.send(result);
  }
});

rounter.get('/', async (req, res) => {
  const data = await selectAccount();

  if (data.error !== undefined) {
    res.status(400).send(data);
  } else {
    res.send(data);
  }
});

rounter.get('/:id', async (req, res) => {
  const data = await selectAccountById(req.params.id);

  if (data.error !== undefined) {
    res.status(400).send(data);
  } else {
    res.send(data);
  }
});

rounter.delete('/:id', async (req, res) => {
  const data = await deleteAccount(req.params.id);

  if (data.error !== undefined) {
    res.status(400).send(data);
  } else {
    res.end();
  }
});

//put atualizar integral
rounter.put('/', async (req, res) => {
  const data = await updateAccount(req.body);

  if (data.error !== undefined) {
    res.status(400).send(data);
  } else {
    res.send(data);
  }
});

//patch para atualizações parciais

export default rounter;
