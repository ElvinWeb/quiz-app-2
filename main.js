// variables declaration
const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

// -------------------button actions -------------------//
startBtn.onclick = () => {
  popupInfo.classList.add("active-popup");
  main.classList.add("active-blur");
};
exitBtn.onclick = () => {
  popupInfo.classList.remove("active-popup");
  main.classList.remove("active-blur");
};

continueBtn.onclick = (e) => {
  e.preventDefault();
  quizSection.classList.add("active-quiz");
  popupInfo.classList.remove("active-popup");
  main.classList.remove("active-blur");
  quizBox.classList.add("active-open");
  showQuestion(0);
  questionCounter(0);
  questionScore();
};

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestion(questionCount);
    questionNum++;
    questionCounter(questionNum);
    nextBtn.classList.remove("btn-active");
  } else {
    showResultBox();
  }
};
tryAgainBtn.onclick = () => {
  quizBox.classList.add("active-open");
  resultBox.classList.remove("active-result");
  nextBtn.classList.remove("btn-active");

  userScore = 0;
  questionNum = 0;
  questionCount = 0;

  showQuestion(questionCount);
  questionCounter(questionNum);
  questionScore();
};
goHomeBtn.onclick = () => {
  quizSection.classList.remove("active-quiz");
  resultBox.classList.remove("active-result");
  nextBtn.classList.remove("btn-active");

  userScore = 0;
  questionNum = 0;
  questionCount = 0;

  showQuestion(questionCount);
  questionCounter(questionNum);
};
// test variables
let questionCount = 0;
let questionNum = 0;
let userScore = 0;

// selecting correct option
function optionSelected(ans) {
  const option = document.querySelectorAll(".option");
  let userAnswer = ans.textContent;
  let correctAnswer = questions[questionCount].answer;

  if (userAnswer == correctAnswer) {
    ans.classList.add("correct");
    userScore += 5;
    questionScore();
  } else {
    ans.classList.add("incorrect");

    for (let i = 0; i < option.length; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  for (let i = 0; i < option.length; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("btn-active");
}
// showing the question in the quiz box from array
function showQuestion(index) {
  const questionText = document.querySelector(".question-text");
  questionText.innerText = `${questions[index].num}.${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div> `;
  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

//Question counting
function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.innerText = `${questions[index].num} of ${questions.length} questions`;
}
// score calculation
function questionScore(index) {
  const scoreText = document.querySelector(".header-score");
  scoreText.innerHTML = `Score: ${userScore} / 25 `;
}
// result progressing calculation
function showResultBox() {
  quizBox.classList.remove("active-open");
  resultBox.classList.add("active-result");

  const scoreText = document.querySelector(".score-text");
  scoreText.innerHTML = `Your Score ${userScore} out of 25`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / 25) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
