const indexController = {
    // Pode retornar uma página ou não
    index: (req, res) => {
      return res.render("indexAdmin", {
        title: "Pagina do Anime", //user: req.cookies.user,
      });
    },
  };
  
  module.exports = indexAdminController;
  