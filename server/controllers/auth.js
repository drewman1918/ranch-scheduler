const bcrypt = require('bcryptjs')

module.exports = function addAuthEndpointsTo(app) {
    app.get('/auth/test', test);

    app.post('/auth/create', createUser)

    app.post('/auth/login', login)
}

function test(req, res){
    req.db.test()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
}

function createUser(req, res) {
    const { name, email, phone, spassword, family_id, role_id, family_role_id } = req.body
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(spassword, salt, function (err, hash) {
            req.db.create_user([name, email, phone, hash, family_id, role_id, family_role_id])
                .then(() => {
                    res.sendStatus(200)
                }).catch(e => res.status(500).send(e))
        })
    })
}

function login(req, res) {
    let { email, spassword } = req.body;
    req.db.read_password([email])
        .then(([{password, id}]) => {
            bcrypt.compare(spassword, password, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }
                else if (result) {
                    req.db.read_user([id]).then(user => {
                        req.session.user = user[0]
                        res.sendStatus(200)
                    }).catch(err => {
                        res.status(500).send(err)
                    })
                } else {
                    res.sendStatus(500)
                }
            })
        }).catch((err) => {
            res.status(500).send(err)    
        })
}