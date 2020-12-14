import express from 'express';
import { accountRouter } from './src/routes/accountRouter.js';
import { db } from './src/models/index.js';

//Conectar ao mongo db atlas (nuvem)
(async () => {
  try {
    console.log('Conectando ao MongoDB...');
    await db.mongoose.connect('mongodb://localhost:27017/bank', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado com sucesso!');
  } catch (error) {
    console.log('Error ao conectar no MongoDB.' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('API iniciada!');
});
