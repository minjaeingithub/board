  ///후버기능 via js
  ///document.getElementById("greeting").onmouseover = function() {mouseOver()};
  ///document.getElementById("greeting").onmouseout = function() {mouseOut()};

///function mouseOver() {
  ///document.getElementById("greeting").style.color = "#1A508B";
}

///function mouseOut() {
  ///document.getElementById("greeting").style.color = "#c1a1d3";
}

///function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("value", "What I Should DO");
  document.body.appendChild(x);
  x.setAttribute("")
}

///function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "submit");
  document.body.appendChild(x);
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// 누르면 crossed out 되는 기능
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// 체킹
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// add: appendchild부분이 헷갈림....
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Nothing means LAZINESS");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
