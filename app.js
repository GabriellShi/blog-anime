// Importando os controladores
const getAllController = require('./src/controllers/getAllController');
const salesPendingController = require('./src/controllers/salesPendingController');

// Função principal assíncrona
async function main() {
  try {
    // Chama a função do controlador getAllController
    const getAllData = await getAllController();

    // Chama a função do controlador salesPendingController
    const salesPendingData = await salesPendingController();

    console.log('Operações concluídas com sucesso!');
    console.log('Dados da getAllController:', getAllData);
    console.log('Dados da salesPendingController:', salesPendingData);
  } catch (error) {
    console.error('Erro durante a execução:', error);
  } finally {
    // Certifique-se de encerrar a conexão com o banco de dados ou realizar qualquer limpeza necessária
    // connection.end();
  }
}

// Executa a função principal
main();
