const detailsNewsController = {
    // Pode retornar uma página ou não
    detailsNews: (req, res) => {
      return res.render("detailsNews", {
        title: "Detalhe da Noticia", //user: req.cookies.user,
      });
    },
  };
  
  module.exports = detailsNewsController;
  