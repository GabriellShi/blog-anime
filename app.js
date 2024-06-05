const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require('body-parser');
const activityMonitor = require("./src/middlewares/activityMonitor");
const cron = require('node-cron');
const backupDatabase = require('./backup');

const setUserMiddleware = require("./src/middlewares/setUserMiddleware");

// Configuração da sessão
app.use(session({
  secret: 'sua-chave-secreta', // Substitua por uma chave secreta forte
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor está rodando bem");
  // Agendar o backup semanalmente no domingo às 2h da manhã
  cron.schedule('0 2 * * 0', () => {
    console.log('Iniciando backup semanal do banco de dados...');
    backupDatabase();
  });
});

const indexRoute = require("./src/routes/indexRoute");
const contatoRoute = require("./src/routes/contatoRoute");
const searchRoute = require("./src/routes/searchRoute");
const calendarioAnimesRoute = require("./src/routes/calendarioAnimesRoute");
const detailsNewsRoute = require("./src/routes/detailsNewsRoute");
const indexAdmRoute = require("./src/routes/indexAdmRoute");
const loginRoute = require("./src/routes/loginRoute");
const detailsRecomendaRoute = require("./src/routes/detailsRecomendaRoute");
const detailsTemporadaRoute = require("./src/routes/detailsTemporadaRoute");
const detailsLancamentoRoute = require("./src/routes/detailsLancamentoRoute");

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de atividade do usuário
app.use(activityMonitor);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(setUserMiddleware);

app.use("/detailsNews", detailsNewsRoute);
app.use("/", contatoRoute);
app.use("/", searchRoute);
app.use("/", calendarioAnimesRoute);
app.use("/detailsRecomenda", detailsRecomendaRoute);
app.use("/detailsTemporada", detailsTemporadaRoute);
app.use("/detailsLancamento", detailsLancamentoRoute);
app.use("/", indexRoute);
app.use("/", indexAdmRoute);
app.use("/", loginRoute);

app.use((req, res) => {
  res.status(404).render('erro-404.ejs', { title: 'Página não encontrada' });
});

// Rota para atualizar a atividade do usuário
app.post('/update-activity', (req, res) => {
  if (req.cookies.user) {
    req.session.lastActivity = Date.now();
  }
  res.sendStatus(200);
});

// Chama a função backup do banco de dados e salva aqui no codigo (pasta backup) tambem é salvo 
// apenas os 4 ultimos backups para assim não sobrecarregar
async function main() {
  console.log('Iniciando backup semanal do banco de dados...');
  backupDatabase();
}

// main();
