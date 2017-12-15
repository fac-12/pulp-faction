/* eslint-disable */

var addBookForm = document.getElementById('addbook-form');
var title = document.getElementById('Title');
var author = document.getElementById('Author');
var isbn = document.getElementById('ISBN');
var genre = document.getElementById('genre');

addBookForm.addEventListener('submit', function(event){
  event.preventDefault();
    var body = {
      'Title': title.value,
      'Author': author.value,
      'Isbn': isbn.value,
      'Genre': genre.value
    }
  xhrTemplate('/addbook', 'POST', body, 201, function(response){
      console.log('callback run')
  });
});

var xhrTemplate = function(url, method, body, responseStatus, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(this.readyState === 4){
      if (this.status === responseStatus) {
        console.log(xhr.getResponseHeader('Location'));
        window.location.href = xhr.getResponseHeader('Location');
      } else {
          try {
            var response = JSON.parse(xhr.responseText);
            callback(response);
          } catch (e) {
            var response = xhr.responseText;
            callback(response);
          }
       }

    }
  };

  xhr.open(method, url, true);
  if(method === 'GET') xhr.send();
  else if(method === 'POST') {
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(body));
  }

}
