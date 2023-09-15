// cron.js

const cron = require('node-cron');

// // Defina a tarefa agendada para executar à meia-noite todos os dias.
// const task = cron.schedule('0 0 * * *', () => {
//   // Sua lógica de tarefa aqui
//   console.log('Tarefa agendada executada!');
// });


const task = cron.schedule('* * * * *', () => {
    // Sua lógica de tarefa aqui
    console.log('Tarefa agendada executada a cada minuto!');
  });
  
// Inicie a tarefa
task.start();
