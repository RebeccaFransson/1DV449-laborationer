'use strict';

var start = {
  url: 'http://localhost:8000',

  //skapa en funtion som är onload och kollar om något finns i localstorage och skriver ut det
  start: function(){
    if(typeof(Storage) !== "undefined") {
      if(localStorage.getItem('search')){
          start.outputResult(JSON.parse(localStorage.getItem('search')).sort());
          document.querySelector('#name').textContent = JSON.parse(localStorage.getItem('name'));
      }
    }else{
        // stödjer ej localstorage
    }
    document.querySelector('#media').onkeydown = function(e){
       if(e.keyCode == 13){
         e.preventDefault();
         start.inputResults(e.path[1]);
       }
    };
  },

  inputResults: function(form){
    var err = document.querySelector('#error');
    var input = document.querySelector('#inputname');
    var ul = document.querySelector('#result').querySelector('ul');
    var name = form.InputName.value;
    err.textContent = '';

    if(!start.isEmptyBlank(name)){
      if(start.strip(name) != name){
        err.textContent = 'Your username contains invalid characters, try again';
        input.value = '';
      }else{
        if(start.containWhitespace(name)){
          name = start.capitalize(name).replace(/\s/g, '');
          err.textContent = 'White-spaces is not allowed, i have put it together for you';
          err.style.width = '312px';
        }
        document.querySelector('#name').textContent = name;
        ul.textContent = '';
        var li = document.createElement('li'), img = document.createElement('img');
        img.setAttribute('src', 'loader.gif');
        li.appendChild(img);
        ul.appendChild(li);

        $.ajax({
          type: 'GET',
          data: name,
          url: start.url+'/inputname',
              success: function(data) {
                data = JSON.parse(data);
                data.sort(function(a,b){return a.hasname-b.hasname});
                start.outputResult(data);
                //spara till localstorage
                localStorage.setItem('search', JSON.stringify(data));
                localStorage.setItem('name', JSON.stringify(name));
              }
        });
      }
    }else{
      ul.textContent = '';
      err.textContent = 'Please write a username that you wanna search';
    }

  },

  outputResult: function(outputArray){
    var ul = document.querySelector('#result').querySelector('ul');
    ul.textContent = '';
    for (var i = 0; i < outputArray.length; i++) {
      var li = document.createElement('li'), h3 = document.createElement('h2'), p = document.createElement('p'), a = document.createElement('a');
      if(!outputArray[i].hasname){
        h3.appendChild(document.createTextNode(outputArray[i].from));
        a.setAttribute('href', outputArray[i].signup);
        a.appendChild(document.createTextNode('Sign up!'));
        p.appendChild(document.createTextNode('The username is available!'));
        li.appendChild(a);
        li.className = 'available';
        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);
      }else{
        h3.appendChild(document.createTextNode(outputArray[i].from));
        if(outputArray[i].error == true){
          p.appendChild(document.createTextNode('The third-party server gave a error'));
          li.className = 'errorServer';
        }else{
          a.setAttribute('href', outputArray[i].url);
          a.appendChild(document.createTextNode('Their homepage'));
          p.appendChild(document.createTextNode('The username is unavailable!'));
          li.appendChild(a);
          li.className = 'occupied';
        }
        li.appendChild(h3);
        li.appendChild(p);

        ul.appendChild(li);
      }
    }
    window.scrollBy(0, document.body.scrollHeight);
  },

  /*VERIFIERINGS FUNKTIONER*/
  isEmptyBlank: function(str){
    return (!str || 0 === str.length || /^\s*$/.test(str));
  },
  containWhitespace: function(str){
    return (str.replace(/\s/g, '') != str);
  },
  capitalize: function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  strip: function(str){
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText;
  }

};
window.onload = start.start();
