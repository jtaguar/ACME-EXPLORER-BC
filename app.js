require('./db');
require ('./routerSevices');

bodyParser = require('body-parser');

var port = process.env.PORT || 4000;

console.log("Server ready with static content!");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
app.listen(port, function () {
console.log('ACME-Market RESTful API server started on: ' + port);
});
});
 
mongoose.connection.on("error", function (err, conn) {
console.error("DB init error " + err);
});
