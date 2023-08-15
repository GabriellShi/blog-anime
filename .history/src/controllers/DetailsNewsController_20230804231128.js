const detailsNewsController = {
    // Pode retornar uma página ou não
    detailsNews: (req, res) => {
      return res.render("Detalhe da ", {
        title: "Blog Anime", //user: req.cookies.user,
      });
    },
  };
  
  module.exports = detailsNewsController;
  