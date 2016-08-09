function ready() {
  $('.tasks__add-button').on('click', onClick);
  $('.tasks').on('click', '.task__delete-button', onDeleteClick);
  $('.tasks').on('click', '.task__checkbox', onCheckboxClick);
}

function onClick() {
  var input = $('.tasks__input');
  var list = $('.tasks__list');
  var taskText = input.val();
  var taskId = Date.now();
  var taskItem = document.createElement('div');
  
  if (taskText === '') {
    return;
  }
  
  taskItem.classList.add('task');
  taskItem.dataset.id = taskId;
  taskItem.innerHTML = `
    <div class="task__checkbox"><i class="fa fa-square-o"></i></div>
    <span class="task__text">${taskText}</span>
    <div class="task__delete-button"><i class="fa fa-times"></i></div>`;
  
  list.append(taskItem);
  input.val('').focus();
  
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: JSON.stringify({id: taskId, name: taskText}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    failure: function(err) {
      console.error(err);
    }
  });
}

function onDeleteClick() {
  var task = $(this).closest('.task');
  var taskId = task.data('id');
  task.remove();
  
  $.ajax({
    url: '/tasks/' + taskId,
    type: 'DELETE',
    failure: function(err) {
      console.error(err);
    }
  });
}

function onCheckboxClick() {
  var task = $(this).closest('.task');
  var checkbox = $(this).children('.task__checkbox i');
  var taskId = task.data('id');
  
  task.toggleClass('task_done');
  checkbox.toggleClass('fa-square-o');
  checkbox.toggleClass('fa-check-square-o');
  $.ajax({
    url: '/tasks/' + taskId,
    type: 'PUT',
    failure: function(err) {
      console.error(err);
    }
  });
}