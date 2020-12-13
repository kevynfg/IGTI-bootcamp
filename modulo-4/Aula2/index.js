const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://kevynfg:ke452366@cluster0.7ozho.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  try {
    const collection = client.db('grades').collection('student');

    //realizar uma busca no banco
    const findSomeone = await collection
      .find({ name: 'Victor Novaes' })
      .toArray();

    console.log(findSomeone);

    //Mostrar os bancos de dados cadastrados
    const databaselist = await client.db().admin().listDatabases();
    databaselist.databases.forEach((db) =>
      console.log(`Database -> ${db.name}`)
    );

    client.close();
  } catch (err) {
    console.log(err);
  }
});
