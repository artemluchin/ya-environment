var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var DATA_PATH = 'public/assets/data/data.json';

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  console.log('GET /');
  fs.readFile(DATA_PATH, 'utf-8', function(err, data) {
    if (err) throw err;
    var tasks = JSON.parse(data);
    
    console.time('Page has been rendered in');
    response.render('index', {title: 'ToDo List', tasks: tasks});
    console.timeEnd('Page has been rendered in');
  });
});

app.post('/tasks', function(req, res) {
  console.log('POST /tasks');
  var taskText = req.body.name;
  var taskId = req.body.id;
  fs.readFile(DATA_PATH, 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    var tasks = JSON.parse(data);
    var newTask = {
      id: taskId,
      name: taskText,
      isDone: false
    };
    tasks.push(newTask);
    
    fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 4), (err) => {
      if (err) throw err;
      console.log('Task has been created.');
      res.send(newTask);
    });
  });
});

app.delete('/tasks/:id', function(request, response) {
  var taskId = request.params.id;
  console.log('DELETE /tasks/'+ taskId);
  fs.readFile(DATA_PATH, function(err, data) {
    if (err) throw err;
    var tasks = JSON.parse(data);
    
    tasks.forEach(function(task, index) {
      if (Number(task.id) === Number(taskId)) {
        tasks.splice(index, 1);
      }
    });
    
    fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 4), (err) => {
      if (err) throw err;
      console.log('Task has been removed.');
      response.send(tasks);
    });
  });
});

app.put('/tasks/:id', function(request, response) {
  var taskId = request.params.id;
  console.log('PUT /tasks/' + taskId);
  fs.readFile(DATA_PATH, function(err, data) {
    if (err) throw err;
    var tasks = JSON.parse(data);
    
    tasks.forEach(function(task, index) {
      if (Number(task.id) === Number(taskId)) {
        tasks[index].isDone = !task.isDone;
      }
    });
    
    fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 4), (err) => {
      if (err) throw err;
      console.log('Task has been updated.');
      response.send(tasks);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});