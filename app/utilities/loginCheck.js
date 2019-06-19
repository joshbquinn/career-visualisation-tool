
//Authentication check for users to proceed.

exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    else
        res.redirect('/');
};

