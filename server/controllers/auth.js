module.exports = function addAuthEndpointsTo(app) {
    app.get('/auth/test', test);
}

function test(req, res){
    req.db.test()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
}