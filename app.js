
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , demo = require('./routes/demo')
  , htmud = require('./routes/htmud')
  , http = require('http')
  , path = require('path')
  , tao = require('./src/tao/connect');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '44M7A21G43I7C45'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(tao.map(__dirname, '/src'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/demo/zoom', demo.zoom);
app.get('/demo/sound', demo.sound);
app.get('/htmud/main', htmud.main);
app.get('/htmud/login', htmud.loginForm);
app.post('/htmud/login', htmud.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
