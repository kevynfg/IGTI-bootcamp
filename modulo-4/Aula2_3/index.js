import mongoose from 'mongoose';

//Estabelecer conexão com mongodb local
// mongoose.connect('mongodb://localhost/grades', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoConnect();

//Conectar ao mongo db atlas (nuvem)
async function mongoConnect() {
  mongoose.connect(
    'mongodb+srv://kevynfg:ke452366@cluster0.7ozho.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

//Criar o modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

//Definir o modelo para student
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');
new student({
  name: 'Paulo Assis',
  subject: 'Matemática',
  type: 'Trabalho Prático',
  value: 22,
})
  .save()
  .then(() => console.log('Documento inserido'))
  .catch((err) => console.log('Houve erro ao gravar o documento', err));
