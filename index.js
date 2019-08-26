'use strict';

//list of questions and answers for the quiz
const quizQuestions = [
    {id : 0,
    question: 'When does hurricane season officially begin?',
    answers: ['May 1st', 'June 1st', 'July 1st', 'September 1st'],
    correctAns : 'June 1st'
    },
    {id : 1,
    question: 'How much water should you store?',
    answers: ['1 gallon of water a day per person for 3 days', '1 gallon of water a day for 3 days', '1 gallon of water per person for 3 days', 'There is no need to store water'],
    correctAns : '1 gallon of water a day per person for 3 days'
    },
    {id : 2,
    question: 'Greatest threat to life and property from a hurricane',
    answers: ['Lightning', 'Thieves', 'Storm surges', 'Fires'],
    correctAns: 'Storm surges'
    },
    {id : 3,
    question: 'What should you use for your source of light?',
    answers: ['Candles', 'Flashlights', 'Kerosene lamps', 'Electricity'],
    correctAns: 'Flashlights'
    },
    {id : 4,
    question: 'What should you do if you come across standing water?',
    answers: ['Try and swim', 'Walk through', 'Drive through', 'Turn Around'],
    correctAns: 'Turn Around'
    },
    {id : 4,
    question: 'When is it safe to go outside?',
    answers: ['When the local authorities say it is safe', 'When it looks calm outside', 'When you think it is safe to do so', 'At any time'],
    correctAns: 'When the local authorities say it is safe'
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
        return `<div class = "quiz-status">Quiz Status: ${questionNum + 1} of 6 || Your Score: ${score}/6</div>
        <h3>${quizQuestions[questionNum].question}</h3>
        <form role="form" accept-charset="UTF-8" method="post" class="questionnaire">
        <fieldset>
          <legend>Select an Answer</legend>
          <div class = "test">
          <span><input type="radio" name="answer" value="${quizQuestions[questionNum].answers[0]}" required> 
          ${quizQuestions[questionNum].answers[0]}</input></span>
          <span><input type="radio" name="answer" value="${quizQuestions[questionNum].answers[1]}" required> 
          ${quizQuestions[questionNum].answers[1]}</input></span>
          <span><input type="radio" name="answer" value="${quizQuestions[questionNum].answers[2]}" required>
          ${quizQuestions[questionNum].answers[2]}</input></span>
          <span><input type="radio" name="answer" value="${quizQuestions[questionNum].answers[3]}" required>
          ${quizQuestions[questionNum].answers[3]}</input></span>
          </div>
          <button type="submit" class = "submit-button">Submit</button>
        </fieldset>
      </form>`;
    }
    else if (score < 4) {
    return `<div class = "quiz-area"><p>Your total score is: ${score}, but with a little more readiness you can weather the next hurricane season!</p>
    <button type="button" class="restart-button">Try Again!</button></div>`;
  }
  else {
    return `Way to go!  Now share the knowledge with your friends and family :)`;
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
    quizArea.on('click', '.submit-button', function(event) {
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
          console.log(correctAnswer, answer);
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
       `<div class = "correct">Awesome Job!
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
    console.log('working');
}
$(reStart);

