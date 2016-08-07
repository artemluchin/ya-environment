document.addEventListener('DOMContentLoaded', ready);

function ready() {
  document.querySelector('.button').addEventListener('click', onClick);
}

function onClick() {
  alert(addSome(5, 6));
  alert(this.innerHTML);
}

function addSome(a, b) {
  return a + b;
}