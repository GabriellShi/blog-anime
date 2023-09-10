const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const compression = require("compression"); // Importe o middleware de compressão

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor está rodando bem");
});

const indexRoute = require("./src/routes/indexRoute");
const contatoRoute = require("./src/routes/contatoRoute");
const searchRoute = require("./src/routes/searchRoute");
const calendarioAnimesRoute = require("./src/routes/calendarioAnimesRoute");
const detailsNewsRoute = require("./src/routes/detailsNewsRoute");
const indexAdmRoute = require("./src/routes/indexAdmRoute");
const detailsRecomendaRoute = require("./src/routes/detailsRecomendaRoute");
const detailsTemporadaRoute = require("./src/routes/detailsTemporadaRoute");
const detailsLancamentoRoute = require("./src/routes/detailsLancamentoRoute");

// Use o middleware de compressão GZIP
app.use(compression());


// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//
// Configura pasta estática para acesso externo
app.use(express.static(path.join(__dirname, "public")));

// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", path.join(__dirname, "src", "views"));

app.use("/detailsNews", detailsNewsRoute);
app.use("/", contatoRoute);
app.use("/", searchRoute);
app.use("/", calendarioAnimesRoute);
app.use("/detailsRecomenda", detailsRecomendaRoute);
app.use("/detailsTemporada", detailsTemporadaRoute);
app.use("/detailsLancamento", detailsLancamentoRoute);
app.use("/", indexRoute);
app.use("/", indexAdmRoute);

app.use("/images", express.static(path.join(__dirname, "/uploads")));



