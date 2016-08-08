document.addEventListener('DOMContentLoaded', ready);
function ready() {
  $('.tasks__add-button').on('click', onClick);
  $('.tasks').on('click', '.task__delete-button', onDeleteClick);
}

function onClick() {
  var input = $('.tasks__input');
  var list = $('.tasks__list');
  var taskText = input.val();
  var taskItem = document.createElement('li');
  var taskId = Date.now();
  
  taskItem.classList.add('task');
  taskItem.dataset.id = taskId;
  taskItem.innerHTML = `<input class="task__checkbox" type="checkbox"/><span class="task__text">${taskText}</span><button class="task__delete-button">Delete</button>`;
  
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
