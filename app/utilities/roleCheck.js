var scoreController = require('./../controllers/assessmentController')

exports.roleRedirect = function(req, res){

    if(req.user.user_type === 1){
        scoreController.get_user_scores(req.user.user_respondent_id,
            function (score) {
                res.status(200).render('/profile.ejs',{user: req.user, score})

            })
    }
    else if(req.user.user_type === 2){
        res.render('/manager.ejs', {user:req.user})
    }
    else if(req.user.user_type === 3){
        res.render('/admin.ejs', {user:req.user})
    }
};

exports.managerCheck = function(req, res, next){
    if(!req.user.user_type === 2 || req.user.user_type === "undefined"){
        res.render('profile.ejs', {checkMessage: "Not authorized to view this content."})
    }
    else {
        return next();
    }
};

exports.adminCheck = function(req, res, next){
    if(!req.user.user_type === 3){
        res.render({checkMessage: "Not authorized to view this content."})
    }
    else {
        return next();
    }
};

