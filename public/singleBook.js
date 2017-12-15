/* eslint-disable */

var reserveButton = document.getElementById('reserve-btn');

reserveButton.addEventListener('click', function(event) {
  var xhr = new XMLHttpRequest();
  var bookId = event.target.value;

  xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 302) {
      location.reload();
    }
  };

  xhr.open('GET', '/reservebook/' + bookId, true);
  xhr.send();

});
