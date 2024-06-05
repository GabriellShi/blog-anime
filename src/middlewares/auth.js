const authMiddleware = (req, res, next) => {
    const user = req.cookies.user;
    if (!user) {
        return res.redirect("/login");
    }
    res.locals.user = user;
    next();
};

module.exports = authMiddleware;
