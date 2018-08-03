const bodyParser = require('body-parser');
const session = require('express-session');

exports.default = function addMiddlewaresTo(app) {

    //BODY PARSER
    app.use(bodyParser.json());

    //DATABASE
    app.use((req, res, next) => {
        const db = req.app.get('db');
        req.db = db;
        next();
    });

    //SESSION
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
}