// import fs from 'fs';
import { promises as fs } from 'fs';

//UTILIZANDO ASYNC/AWAIT

init();

async function init() {
  try {
    await fs.writeFile('teste.txt', '\nAlguma coisa aleatória');
    await fs.appendFile('teste.txt', '\nNova linha aleatória');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

//UTILIZANDO CALLBACKS

// fs.writeFile('teste.txt', 'Aqui é um arquivo teste', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     fs.appendFile('teste.txt', '\nNova linha adicionada', (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         fs.readFile('teste.txt', 'utf-8', (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });

//UTILIZANDO PROMISES

// fs.writeFile('teste.txt', 'Coisas aleatórias')
//   .then(() => {
//     fs.appendFile('teste.txt', '\nLinha nova adicionada')
//       .then(() => {
//         fs.readFile('teste.txt', 'utf-8')
//           .then((resp) => {
//             console.log(resp);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
