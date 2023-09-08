const contatoController = {
    // Pode retornar uma página ou não
    contato: (req, res) => {
      return res.render("contato", {
        title: "Contato - GoGeek", //user: req.cookies.user,
      });
    },
  
  };
  
  module.exports = contatoController;
  