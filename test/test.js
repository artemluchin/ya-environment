var chai = require('chai');
var expect = chai.expect;
var lib = require('../helpers.js');

var tasks = [{
  id: 324234,
  text: 'test',
  isDone: false
}, {
  id: 253523,
  text: 'test2',
  isDone: true
}];
var taskText = 'newTask';
var taskId = 4;

describe('Function "createTask"', function() {
  it('should return Object', function() {
    var newTask = lib.createTask(taskId, taskText, tasks);
    expect(newTask).to.be.an(('object'));
  });
  describe('newTask Object', function() {
    describe('"id" field', function() {
      it('should be a number', function() {
        var newTask = lib.createTask(5, taskText, tasks);
        expect(newTask.id).to.be.a('number');
      });
      it('should not be a string', function() {
        var newTask = lib.createTask('5', taskText, tasks);
        expect(newTask.id).to.be.a('number');
      });
      it('should be a correct number', function() {
        var correctId = 145;
        var newTask = lib.createTask(correctId, taskText, tasks);
        expect(newTask.id).to.equal(correctId);
      });
    });
    describe('"name" field', function() {
      it('should be a string', function() {
        var newTask = lib.createTask(taskId, 'my new task', tasks);
        expect(newTask.text).to.be.a('string');
      });
      it('should not be an empty string', function() {
        var newTask = lib.createTask(taskId, '', tasks);
        expect(newTask.text).to.not.equal('');
      });
      it('should be a correct string', function() {
        var correctString = 'My new task here';
        var newTask = lib.createTask(taskId, correctString, tasks);
        expect(newTask.text).to.equal(correctString);
      });
    });
    describe('"isDone" field', function() {
      it('should be a boolean', function() {
        var newTask = lib.createTask(taskId, taskText, tasks);
        expect(newTask.isDone).to.be.a('boolean');
      });
      it('should be "false"', function() {
        var newTask = lib.createTask(taskId, taskText, tasks);
        expect(newTask.isDone).to.equal(false);
      });
    });
  });
});

describe('Function deleteTask', function() {
  it('should delete only one task', function() {
    var taskLength = tasks.length;
    lib.createTask(356, 'delete', tasks);
    lib.deleteTask(356, tasks);
    
    expect(tasks.length).to.equal(taskLength);
  });
  it('should delete a correct task', function() {
    var isTaskDeleted = true;

    lib.createTask(123456789, 'foobar', tasks);
    lib.deleteTask(123456789, tasks);
    
    tasks.forEach(function(task) {
      if (task.id === 123456789) {
        isTaskDeleted = false;
      }
    });
    expect(isTaskDeleted).to.equal(true);
  });
});

describe('Function updateTask', function() {
  it('should update only one task', function() {
    var isOnlyOneUpdated = true;
    var testId = 1234;
    var tasks = [{
      id: 123,
      text: 'test',
      isDone: false
    }, {
      id: 1234,
      text: 'test 2',
      isDone: false
    }, {
      id: 12345,
      text: 'test 3',
      isDone: false
    }];
    
    lib.updateTask(testId, tasks);
    
    tasks.forEach(function(task) {
      if (task.id !== testId && task.isDone) {
        isOnlyOneUpdated = false;
      }
    });
    
    expect(isOnlyOneUpdated).to.equal(true);
  });
  it('should update a correct task', function() {
    var isTaskUpdated = true;

    lib.createTask(9876, 'foobar', tasks);
    lib.updateTask(9876, tasks);
    
    tasks.forEach(function(task) {
      if (task.id === 9876 && !task.isDone) {
        isTaskUpdated = false;
      }
    });
    expect(isTaskUpdated).to.equal(true);
  });
});