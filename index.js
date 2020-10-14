import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import accountsRountes from './routes/accounts.js';
import { initDatabase } from './modules/repository.js';
import { logger } from './modules/log.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); //Libera o cors
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/account', accountsRountes);

app.listen(port, () => {
  initDatabase();
  logger.info(`API iniciada ( http://localhost:${port})`);
});
