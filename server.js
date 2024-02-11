require('dotenv').config();

const porta = process.env.PORTA;
const app = require('./src/app');

app.listen(porta, () => {
  console.log(`Servidor escutando porta ${porta}`);
});
