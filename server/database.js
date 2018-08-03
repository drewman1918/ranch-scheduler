const massive = require('massive')

module.exports = function (app) {
  massive(process.env.CONNECTION_STRING)
    .then(db => {
      app.set('db', db)
    })
    .catch(err => console.log(err))
}
