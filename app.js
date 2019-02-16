require('./db');
var app = require('./routerSevices');
var port = process.env.PORT || 4000,
    bodyParser = require('body-parser')
    morgan = require('morgan');

// console.log("Server ready with static content!");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port);
});
