const setUserMiddleware = (req, res, next) => {
    res.locals.user = req.cookies.user || null;
    next();
};

module.exports = setUserMiddleware;
