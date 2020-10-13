import express from 'express'
const app = express();

app.use(express.json());
app.use(express.static("./src/public"))
//utilizado para acessar imagens pela api
app.use("./src/imgs", express.static("./src/public"))


app.listen(3000, () => {
  console.log('Servindo rodando...')
})