var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    blogService     = require('./routes/articles'),
    app = express();

var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
app.use(cors());

app.get('/articles', blogService.findAll);
app.get('/articles/:id', blogService.findById);
app.get('/articles/searchuser/:user', blogService.findByUser)
app.post('/articles', blogService.newPost);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
