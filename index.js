import express from 'express';
import accountsRountes from './rountes/accounts.js';
import { initDatabase } from './modules/repository.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/account', accountsRountes);

app.listen(port, () => {
  initDatabase();
  console.log(`API iniciada ( http://localhost:${port})`);
});
