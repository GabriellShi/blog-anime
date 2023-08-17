const indexAdmController = {
    // Pode retornar uma página ou não
    indexAdm: (req, res) => {
      return res.render("indexAdm", {
        title: "Pagina ADM", //user: req.cookies.user,
      });
    },

    paginasCreate: (req, res) => {
      return res.render("paginasCreate", {
        title: "Pagina Creater", //user: req.cookies.user,
      });
    },
  };

  



  module.exports = indexAdmController;
  