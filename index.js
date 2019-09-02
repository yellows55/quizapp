'use strict';

//list of questions and answers for the quiz
const quizQuestions = [
    {question: 'When does hurricane season officially begin?',
    answers: ['May 1st', 'June 1st', 'July 1st', 'September 1st'],
    correctAns : 'June 1st'
    },
    {question: 'What is a hurricane?',
    answers: ['A storm system that forms over warm ocean waters and moves to land', 'A tornado', 'A lot of rain', 'A storm that brings hail'],
    correctAns: 'A storm system that forms over warm ocean waters and moves to land'
    },
    {question: 'How much water should you store?',
    answers: ['1 gallon of water a day per person for 3 days', '1 gallon of water a day for 3 days', '1 gallon of water per person for 3 days', 'There is no need to store water'],
    correctAns : '1 gallon of water a day per person for 3 days'
    },
    {question: 'Greatest threat to life and property from a hurricane',
    answers: ['Lightning', 'Thieves', 'Storm surges', 'Fires'],
    correctAns: 'Storm surges'
    },
    {question: 'What should you use for your source of light?',
    answers: ['Candles', 'Flashlights', 'Kerosene lamps', 'Electricity'],
    correctAns: 'Flashlights'
    },
    {question: 'What should you do if you come across standing water?',
    answers: ['Try and swim', 'Walk through', 'Drive through', 'Turn Around'],
    correctAns: 'Turn Around'
    },
    {question: 'When is it safe to go outside?',
    answers: ['When the local authorities say it is safe', 'When it looks calm outside', 'When you think it is safe to do so', 'At any time'],
    correctAns: 'When the local authorities say it is safe'
    },
    {question: 'Hurricanes can affect areas inland as far as:',
    answers: ['100 miles inland and more', '10  miles inland', 'They do not affect inland areas', '1 mile inland'],
    correctAns: '100 miles inland and more'
    },
    {question: 'When is the best time to prepare a disaster kit and evacuation plan?',
    answers: ['Tomorrow', 'Next week', 'After an evacuation is announced', 'Now'],
    correctAns: 'Now'
    },
    {question: 'How much damage can an inch of water do to your home?',
    answers: ['Very little damage', 'Up to $25,000 of damage to your home', 'About a $1,000 total', 'It cannot cause any damage at all'],
    correctAns: 'Up to $25,000 of damage to your home'
    }
];

//list of  variables used
const quizArea = $('.quiz-area');
const test = $('.test');
let questionNum = 0;
let score = 0;
let testLength = quizQuestions.length;
let lastQuestion = quizQuestions.length - 1;

//Starting the quiz
function quizStart() {
    quizArea.on('click', '.start-button', function(event) {
        quizArea.html(generateQuestion(quizQuestions));
    });
}
$(quizStart);

//Iterating throught the list of questions until restart
function generateQuestion(arr) {
    if (questionNum < arr.length) {
        return `<div class = "quiz-status">Quiz Status: ${questionNum + 1} of 10 || Your Score: ${score}/10</div>
        <form role="form" accept-charset="UTF-8" method="post" class="questionnaire">
        <h3 class = quiz-question>${quizQuestions[questionNum].question}</h3>
        <fieldset>
          <legend>Select an Answer</legend>
          <div class = "test">
          <label><span class = "first-answer"><input type="radio" name="answer" class= "form-radio" value="${quizQuestions[questionNum].answers[0]}" required> 
          ${quizQuestions[questionNum].answers[0]}</input></span></label>
          <label><span class = "sec-answer"><input type="radio" name="answer" class= "form-radio" value="${quizQuestions[questionNum].answers[1]}" required> 
          ${quizQuestions[questionNum].answers[1]}</input></span></label>
          <label><span class = "third-answer"><input type="radio" name="answer" class= "form-radio" value="${quizQuestions[questionNum].answers[2]}" required>
          ${quizQuestions[questionNum].answers[2]}</input></span></label>
          <label><span class = "fourth-answer"><input type="radio" name="answer" class= "form-radio" value="${quizQuestions[questionNum].answers[3]}" required>
          ${quizQuestions[questionNum].answers[3]}</input></span></label>
          </div>
          <button type="submit" class = "submit-button">Submit</button>
        </fieldset>
      </form>`;
    }
    else if (score < 6) {
      return `<div class = "quiz-area"><p>Your total score is: ${score}/10, but with a little more readiness you can weather the next hurricane season!</p>
      <button type="button" class="restart-button">Try Again!</button>
      </div>`;
  }
  else {
    return `<div class = "quiz-area">
    <p>Way to go!</p>
    <p>Your total score is: ${score}/10</p>
    <p>Now share the knowledge with your friends and family :)</p>
    <button type="button" class="restart-button">Try Again!</button>
    </div>`;
  }    
}

//Changing question number
function nextQuestionNum() {
    questionNum ++;
}

//Increasing score function
function increaseScore() {
  score ++;
}


//evaluating the answer submitted on the quiz
function gradeAnswer() {
    quizArea.on('submit', '.questionnaire', function(event) {
        event.preventDefault();
        let correctAnswer = quizQuestions[questionNum].correctAns;
        let submittedAnswer = $('input[name = answer]:checked');
        let answer = submittedAnswer.val();
        if (answer === correctAnswer) {
          $(correctResponse);
          $(nextQuestionNum);
          $(nextQuestion);
        $('.submit-button').css('background-color', 'blue');
        }
        else if (answer !== correctAnswer) {
          $(wrongResponse);
          $(nextQuestionNum);
          $(nextQuestion);
          $('.submit-button').css('background-color', 'red');
        };
    });
}
$(gradeAnswer);

//Generating the next question for wrong and correct answers
function wrongResponse() {
  if (questionNum === (lastQuestion - 1)) {
    quizArea.html(
    `<div class = "wrong">Woops! The right Answer is: 
    <p>${quizQuestions[questionNum].correctAns}!</p>
    Let's see how we do on the last one:
    <p><button type="button" class = "next-button">Next!</button></p>
    </div>`);
  }
  else if (questionNum === lastQuestion) {
     quizArea.html(
       `<div class = "wrong">Woops! The right Answer is: 
    <p>${quizQuestions[questionNum].correctAns}!</p>
       <p><button type="button" class = "next-button">Your Results!</button></p>
    </div>`);
  }
  else {
    quizArea.html(
    `<div class = "wrong">Woops! The right Answer is: 
    <p>${quizQuestions[questionNum].correctAns}!</p>
    Let's see how we do on the next one:
    <p><button type="button" class = "next-button">Next!</button></p>
    </div>`
  );
}
}

function correctResponse() {
  if (questionNum === (lastQuestion - 1)) {
    quizArea.html(
    `<div class = "correct">You rock!
    Let's see how we do on the last one:
    <P><button type="button" class = "next-button">Next!</button></p>
    </div>`);
  }
  else if (questionNum === lastQuestion) {
     quizArea.html(
       `<div class = "correct">Awesome Job!  Here are your results:
       <p><button type="button" class = "next-button">Your Results!</button></p>
    </div>`);
  }
  else {
    quizArea.html(
    `<div class = "correct">Way to go!!
    Let's see how we do on the next one:
    <p><button type="button" class = "next-button">Next!</button></p>
    </div>`
  );
  $(increaseScore);
  }
}

//Initiating the next questiom
function nextQuestion() {
  quizArea.on('click', '.next-button', function(event){
    quizArea.html(generateQuestion(quizQuestions));
  });

}


//restarting the quiz from the beginning
function reStart() {
  $('main').on('click', '.restart-button', function(event){
    event.preventDefault();
    location.reload();
  });
}
$(reStart);

