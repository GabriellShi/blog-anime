const contatoController = {
    // Pode retornar uma página ou não
    contato: (req, res) => {
      return res.render("contato", {
        title: "Contato - GoGeekAnimes", //user: req.cookies.user,
      });
    },
  

    melhorias: (req, res) => {
      return res.render("melhorias", {
        title: "Melhorias - GoGeekAnimes", //user: req.cookies.user,
      });
    },
    

    obrigado: (req, res) => {
      return res.render("obrigado", {
        title: "Obrigado - GoGeekAnimes", //user: req.cookies.user,
      });
    },

  };
  
  module.exports = contatoController;
  