
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




  /* FAQ Accordion Up and down arrows */
  $(document).ready(function(){
	// Add down arrow icon for collapse element which is open by default
	$(".collapse.show").each(function(){
	  $(this).prev(".card-header").find(".fa").addClass("fa-angle-down").removeClass("fa-angle-right");
	});
	
	// Toggle right and down arrow icon on show hide of collapse element
	$(".collapse").on('show.bs.collapse', function(){
	  $(this).prev(".card-header").find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down");
	}).on('hide.bs.collapse', function(){
	  $(this).prev(".card-header").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
	});
});
