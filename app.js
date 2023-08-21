function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.quizIndex = 0;
}

Question.prototype.checkAnswer = function (reAnswer) {
  return this.answer === reAnswer;
};

Quiz.prototype.getQuestion = function () {
  return this.questions[this.quizIndex];
};

Quiz.prototype.isFinish = function () {
  return this.questions.length === this.quizIndex;
};

Quiz.prototype.guess = function (answer) {
  var question = this.getQuestion();
  if (question.checkAnswer(answer)) {
    this.score++;
  }

  this.quizIndex++;
};

var question1 = new Question(
  "What is the best programming language?",
  ["C", "Javascript", "Python"],
  "Javascript"
);

var question2 = new Question(
  "What is the most popular programming language?",
  ["C", "Javascript", "Python"],
  "Javascript"
);

var question3 = new Question(
  "What is the best modern programming language?",
  ["C", "Javascript", "Python"],
  "Javascript"
);
var questions = [question1, question2, question3];

var quiz = new Quiz(questions);

loadQuestions();

function loadQuestions() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();

    document.querySelector("#question").textContent = question.text;

    var choices = question.choices;

    for (var i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choices[i];

      guessQuestions("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guessQuestions(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestions();
  };
}

function showScore() {
  document.querySelector(
    ".card-body"
  ).innerHTML = `<h4 style="color:red";>Score:${quiz.score}</h4> `;
}

function showProgress() {
  var totalQuestions = quiz.questions.length;
  var questionNumber = quiz.quizIndex + 1;

  document.querySelector(".card-footer").innerHTML =
    "Question " + questionNumber + " of " + totalQuestions;
}
