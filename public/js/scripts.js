
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



/* Asexuality Quiz 
// QUESTIONS

const questions = [
  {
    "question": "Age range?",
    "answer1": "under 18",
    "answer1Total": "1",
    "answer2": "18 - 30",
    "answer2Total": "3",
    "answer3": "over 30",
    "answer3Total": "2"
  },
  {
    "question": "I am often uncomfortable when my close ones talk about sex.",
    "answer1": "Agree",
    "answer1Total": "1",
    "answer2": "Strongly Agree",
    "answer2Total": "2",
    "answer3": "Disagree",
    "answer3Total": "0"
  },
  {
    "question":
      "Select in which order you would value these \"Sex, Connection, Romanticism",
    "answer1": "Sex, Connection, Romanticism",
    "answer1Total": "1",
    "answer2": "Connection, Romanticism, No sex",
    "answer2Total": "3",
    "answer3": "Connection, Romanticism, Sex",
    "answer3Total": "2"
  },
  {
    "question": "I am not sexually attracted to people I am interested in.",
    "answer1": "More often than not.",
    "answer1Total": "3",
    "answer2": "Often",
    "answer2Total": "2",
    "answer3":
      "Very rare (bring on the sex!)",
    "answer3Total": "1"
  },
  {
    "question": "Which best describes your past relationships?",
    "answer1": "You tend to over-eat when you have company.",
    "answer1Total": "1",
    "answer2": "You tend to slip out of sexual situations promptly.",
    "answer2Total": "3",
    "answer3": "You were sexually attracted somewhat after knowing the person.",
    "answer3Total": "2"
  },
  {
    "question":
      "Would you rather be single or be in a happy consensual non-sex relationship?",
    "answer1":
      "Either!",
    "answer1Total": "1",
    "answer2": "Be by myself",
    "answer2Total": "3",
    "answer3": "Have a romantic non-sexual relation",
    "answer3Total": "2"
  },
  {
    "question": "Which of the following colours do you like most?",
    "answer1": "Purple",
    "answer1Total": "3",
    "answer2": "Yellow",
    "answer2Total": "1",
    "answer3": "Black or Grey",
    "answer3Total": "2"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your Asexuality score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>15 - 21- Welcome to the Ace Club, mate!</p>
            <p>10 - 15 - Still figuring yourself out, eh?</p>
            <p>5 - 10 - Somewhat Ace, somewhat overthinking it. </p>
            <p>5 - Come be our ally, maybe not an ace one though!</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
*/
