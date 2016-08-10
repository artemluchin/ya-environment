module.exports = {
  deleteTask: function(taskId, tasks) {
    tasks.forEach(function(task, index) {
      if (task.id === Number(taskId)) {
        tasks.splice(index, 1);
      }
    });
  },
  createTask: function(taskId, taskText, tasks) {
    var newTaskId = Number(taskId);
    
    var newTask = {
      id: newTaskId,
      text: taskText || 'new Task',
      isDone: false
    };
    
    tasks.push(newTask);
    
    return newTask;
  },
  updateTask: function(taskId, tasks) {
    tasks.forEach(function(task, index) {
      if (task.id === Number(taskId)) {
        tasks[index].isDone = !task.isDone;
      }
    });
  }
};