const detailsNewsController = {
    // Pode retornar uma página ou não
    detailsNews: (req, res) => {
      return res.render("detailsNews", {
        title: "Blog Anime", //user: req.cookies.user,
      });
    },
  };
  
  module.exports = detailsNewsController;
  