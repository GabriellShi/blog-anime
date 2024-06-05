const mysqldump = require('mysqldump');
const path = require('path');
const fs = require('fs');

// Configurações do banco de dados
const dbConfig = {
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'fE26H3He41bBFf6BcHEC1dD6AGE4f1Fd',
  database: 'railway',
  port: '17568',
};



const backupDir = path.join(__dirname, 'backups');

// Função para realizar o backup
const backupDatabase = async () => {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `backup-${new Date().toISOString().split('T')[0]}.sql`);

  try {
    await mysqldump({
      connection: dbConfig,
      dumpToFile: backupFile,
    });
    console.log(`Backup realizado com sucesso: ${backupFile}`);
    rotateBackups();
  } catch (error) {
    console.error(`Erro ao realizar o backup: ${error}`);
  }
};

// Função para rotacionar backups
const rotateBackups = () => {
  const files = fs.readdirSync(backupDir);
  if (files.length > 4) { // Mantenha apenas os últimos 4 backups
    const sortedFiles = files.sort((a, b) => {
      const aTime = fs.statSync(path.join(backupDir, a)).mtime;
      const bTime = fs.statSync(path.join(backupDir, b)).mtime;
      return bTime - aTime;
    });
    const filesToDelete = sortedFiles.slice(4);
    filesToDelete.forEach(file => {
      fs.unlinkSync(path.join(backupDir, file));
      console.log(`Backup removido: ${file}`);
    });
  }
};

// Exporta a função para ser usada em outros arquivos
module.exports = backupDatabase;
