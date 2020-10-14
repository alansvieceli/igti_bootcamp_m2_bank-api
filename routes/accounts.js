import express from 'express';
//import cors from 'cors';
import {
  insertAccount,
  selectAccount,
  selectAccountById,
  deleteAccount,
  updateAccount,
} from '../modules/repository.js';
import { logger } from '../modules/log.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const data = await insertAccount(req.body);

  if (data.error !== undefined) {
    next(data.error);
  } else {
    res.send(data);
  }
});

//libera somente o endpoint
//router.get('/', cors(), async (req, res, next) => {

router.get('/', async (req, res, next) => {
  const data = await selectAccount();

  if (data.error !== undefined) {
    next(data.error);
  } else {
    res.send(data);
  }
});

router.get('/:id', async (req, res, next) => {
  const data = await selectAccountById(req.params.id);

  if (data.error !== undefined) {
    next(data.error);
  } else {
    res.send(data);
  }
});

router.delete('/:id', async (req, res, next) => {
  const data = await deleteAccount(req.params.id);

  if (data.error !== undefined) {
    next(data.error);
  } else {
    res.end();
  }
});

//put atualizar integral
router.put('/', async (req, res, next) => {
  const data = await updateAccount(req.body);

  if (data.error !== undefined) {
    next(data.error);
  } else {
    res.send(data);
  }
});

//patch para atualizações parciais

//tratamento de todos os erros q derem acima, e usaram
router.use((err, req, res, next) => {
  logger.error(`${req.method} - ${req.baseUrl}`);
  logger.error(err);
  res.status(400).send({ error: err });
});

export default router;
