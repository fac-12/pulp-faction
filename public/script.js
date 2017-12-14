/* eslint-disable */

var loginForm = document.getElementById('logIn');
var signupForm = document.getElementById('signUp');
var signupName = document.getElementById('suName');
var signupGitterHandle = document.getElementById('suGitterHandle');
var signupPw = document.getElementById('suPw');
var lgGitter = document.getElementById('lgGitter');
var lgPassword = document.getElementById('lgPassword');
var passwordError = document.getElementById('password-error');
var usernameError = document.getElementById('username-error');
var suError = document.getElementById('suError');




loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var body = {
    username: lgGitter.value,
    password: lgPassword.value
  };

  xhrTemplate('/login', 'POST', body, 201, function(response) {
    if(response === 'Your password is incorrect') {
      passwordError.textContent = response;
      passwordError.style.display = 'block';
    }
    else if(response === 'Username doesn\'t exist') {
      usernameError.textContent = response;
      usernameError.style.display = 'block';
    }

  })

});

signupForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var body = {
    name: suName.value,
    gitterhandle: suGitterHandle.value,
    password: suPw.value,
  };

  xhrTemplate('/signup', 'POST', body, 201, function(response) {
    if(response === 'This user is already registered, please login') {
      suError.textContent = response;
      suError.style.display = 'block';
    }

  })

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
