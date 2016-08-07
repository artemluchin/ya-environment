var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  console.time('render');
  response.render('index');
  console.timeEnd('render');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});