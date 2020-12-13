import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './src/routes/studentRouter.js';

//Iniciar conexão com o banco
mongoConnect();

//Conectar ao mongo db atlas (nuvem)
async function mongoConnect() {
  await mongoose.connect(
    'mongodb+srv://kevynfg:ke452366@cluster0.7ozho.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3001, () => {
  console.log('API iniciada!');
  console.log('Conexão com o banco iniciada.');
});
