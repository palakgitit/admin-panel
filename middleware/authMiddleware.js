const User = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
    try {
        const userId = req.cookies.userId;

        if (!userId) {
            return res.redirect("/login");
        }

        const user = await User.findById(userId);

        if (!user) {
            res.clearCookie("userId");
            return res.redirect("/login");
        }

        req.user = user;
        res.locals.user = user;

        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error.message);
        res.clearCookie("userId");
        return res.redirect("/login");
    }
};

const isGuest = (req, res, next) => {
    if (req.cookies.userId) {
        return res.redirect("/dashboard");
    }

    next();
};

module.exports = {
    isAuthenticated,
    isGuest,
};