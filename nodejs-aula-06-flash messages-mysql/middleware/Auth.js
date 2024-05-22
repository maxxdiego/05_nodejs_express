function Auth(req, res, next) {
    if(req.session.user != undefined){
        next()
    }else{
        res.render("login", {
            loggedOut : true
        })
    }
}
export default Auth

