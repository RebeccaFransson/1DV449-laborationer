'use strict';

var start = {
  url: 'http://localhost:8080',
  inputResults: function(form){
    var name = form.InputName.value;
    if(!start.isEmptyBlank(name)){
      name = (start.containWhitespace(name)) ? start.capitalize(name).replace(/\s/g, '') : name; //Om den innehåller space, tabort dem
      document.querySelector('#inputname').value = '';
      document.querySelector('#name').textContent = name;
      console.log('skickas t server '+name);
      $.ajax({
        type: 'GET',
        data: name,
        url: start.url+'/inputname',
            success: function(data) {
                data.sort(function(a,b){return a.hasname-b.hasname});
                start.outputResult(data.sort());
            }
      });
      document.querySelector('#result').querySelector('ul').textContent = '';
    }else{
      var err = document.querySelector('#error');
      err.textContent = 'Please write a username that you wanna search';
      err.style.border = '1px rgba(255, 0, 0, 0.49) solid';
    }

  },

  outputResult: function(outputArray){
    for (var i = 0; i < outputArray.length; i++) {
      var li = document.createElement('li');
      var h3 = document.createElement('h2');
      var p = document.createElement('p');
      if(!outputArray[i].hasname){
        h3.appendChild(document.createTextNode(outputArray[i].from));
        p.appendChild(document.createTextNode('Användarnamnet är ledigt'));
        li.appendChild(h3);
        li.appendChild(p);
        li.className = 'available';
        document.querySelector('#result').querySelector('ul').appendChild(li);
      }else{
        h3.appendChild(document.createTextNode(outputArray[i].from));
        var a = document.createElement('a');
        a.setAttribute('href', outputArray[i].url);
        a.appendChild(document.createTextNode(outputArray[i].url));
        p.appendChild(a);
        li.appendChild(h3);
        li.appendChild(p);
        li.className = 'occupied';
        document.querySelector('#result').querySelector('ul').appendChild(li);
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
    console.log(str);
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

};
