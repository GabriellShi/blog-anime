const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");

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



// Configura o Nodemailer com as suas credenciais de email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

app.post("/enviar-email", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comentario = req.body.comentario;

  // Configura os detalhes do email a ser enviado
  const mailOptions = {
    from: "seu-email@gmail.com",
    to: "contatosgogeek@gmail.com", // Substitua pelo email de destino
    subject: "Nova mensagem do site de contato",
    text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${comentario}`
  };

  // Envia o email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro ao enviar o email.");
    } else {
      console.log("Email enviado: " + info.response);
      res.redirect("/obrigado"); // Redirecione para uma página de agradecimento
    }
  });
});