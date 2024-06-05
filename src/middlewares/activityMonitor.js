const sessionTimeout = 1 * 60 * 1000; // 1 minuto em milissegundos
const logoutTimeout = 3 * 60 * 1000; // 3 minutos em milissegundos

const activityMonitor = (req, res, next) => {
  if (!req.cookies.user) {
    return next();
  }

  const now = Date.now();

  if (!req.session.lastActivity) {
    req.session.lastActivity = now;
  }

  const lastActivity = req.session.lastActivity;
  const elapsed = now - lastActivity;

  if (elapsed > sessionTimeout) {
    if (elapsed > logoutTimeout) {
      // Se o usuário está inativo por mais de 3 minutos, deslogar
      res.clearCookie("user");
      res.clearCookie("admin");
      return req.session.destroy(err => {
        if (err) {
          console.error("Erro ao destruir a sessão:", err);
        }
        return res.redirect("/");
      });
    } else {
      // Iniciar o timer de logout de 3 minutos
      req.session.logoutTimer = now + logoutTimeout;
    }
  } else {
    // Reiniciar o timer de logout e atualizar a última atividade
    req.session.logoutTimer = now + logoutTimeout;
    req.session.lastActivity = now;
  }

  next();
};

module.exports = activityMonitor;
