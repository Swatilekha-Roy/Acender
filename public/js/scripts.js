
// typing effect


const words = ["is my pride","is not a phase","is my choice","is not lethargy","is my identity","is not abnormal","is sweet as an unicorn", "is not a myth"];
let i = 0;
let timer;

function typingEffect() {
	let word = words[i].split("");
	var loopTyping = function() {
		if (word.length > 0) {
			document.getElementById('word').innerHTML += word.shift();
		} else {
			deletingEffect();
			return false;
		};
		timer = setTimeout(loopTyping, 400);
	};
	loopTyping();
};

function deletingEffect() {
	let word = words[i].split("");
	var loopDeleting = function() {
		if (word.length > 0) {
			word.pop();
			document.getElementById('word').innerHTML = word.join("");
		} else {
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
			return false;
		};
		timer = setTimeout(loopDeleting, 100);
	};
	loopDeleting();
};

typingEffect();

$('#mainNav').affix({
	offset: {
	  top: 50
	}
  })




  


var $btn = document.getElementsByClassName('button');
var mouseObj = {
  mouseCoords: null,
  mousetThreshold: 0.12,
  manageMouseLeave: function(event) {
    event.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0.2)";
    // update btn gradient
    event.currentTarget.style.background = "#233142";
  },
  manageMouseMove: function(event) {
    var dot, eventDoc, doc, body, pageX, pageY;
    
    event = event || window.event; // IE-ism
    target = event.currentTarget;
    // (old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Use event.pageX / event.pageY here

    //normalize
    //bodyRect = document.body.getBoundingClientRect(),
    var elemRect = target.getBoundingClientRect(),//$btn.getBoundingClientRect(),
        mean = Math.round(elemRect.width / 2);
    //offset   = elemRect.top - bodyRect.top;

    //mouseObj.mouseCoords = {mouse_x: event.pageX - elemRect.left , mouse_y:event.pageY - elemRect.top}
    mouseObj.mouseCoords = {
      mouse_true_x: event.pageX - elemRect.left,
      mouse_x: (event.pageX - elemRect.left - mean) * mouseObj.mousetThreshold,
      mouse_y: event.pageY - elemRect.top
    }
    mouseObj.manageButtonShadow(-1, target);
  },
  manageButtonShadow: function(direction, target) {
    if (mouseObj.mouseCoords) {
      mouseObj.mouseCoords.mouse_x = Math.floor(mouseObj.mouseCoords.mouse_x);
      target.style.boxShadow = direction * mouseObj.mouseCoords.mouse_x + "px 10px 0 rgba(0,0,0,0.2)";
      
      // update btn gradient
      target.style.background = "radial-gradient(at "+mouseObj.mouseCoords.mouse_true_x+"px, #2a3d52 0%, #233142 80%)";

    }
  }
}

// init listeners
for(i=0; i<$btn.length; i++) {
  $btn[i].addEventListener('mousemove', mouseObj.manageMouseMove, false);
  $btn[i].addEventListener('mouseleave', mouseObj.manageMouseLeave, false);
}
