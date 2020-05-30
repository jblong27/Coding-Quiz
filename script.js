//grabbing elements
var startEl = document.getElementById("start");
var startbtn = document.getElementById("start-btn");
var highScoreBtn = document.getElementById("high-scores");
var codequizEl = document.getElementById("codequiz");
var timerEl = document.getElementById("timer");
// questions:
var questionsEl = document.getElementById("questions");
// answers to questions:
var answerA = document.getElementById("a1");
var answerB = document.getElementById("a2");
var answerC = document.getElementById("a3");
var answerD = document.getElementById("a4");
// 
var resultEl = document.getElementById("result");
var endpageEl = document.getElementById("endpage");
var finalscoreEl = document.getElementById("finalScore");
var inputEl = document.getElementById("input");
var submitEl = document.getElementById("submit");
var scorePage = document.getElementById("scorePage");
var scoreContainer = document.getElementById("scoreContainer");
var boardHeader = document.getElementById("boardHeader");
var header1 = document.getElementById("lbH1");
var header2 = document.getElementById("lbH2");
var leaderBoard = document.getElementById("leaderBoard");
var scoresEl = document.getElementById("scores");
var initialsEl = document.getElementById("initials");
var endpageBtns = document.getElementById("endpage-btns");
var restartBtn = document.getElementById("restart");
var clearScoresBtn = document.getElementById("clearscores");



// variable / object to contain my quiz questions
var quizQuestions = [
{
    question: "Inside which HTML element do we put the JavaScript?",
    answerA: "A. <script>",
    answerB: "B. <javascript>",
    answerC: "C. <js>",
    answerD: "D. <scripting>",
    rightAnswer: "a"},
{
    question: "How do you begin a loop?",
    answerA: "A. if",
    answerB: "B. else",
    answerC: "C. else if",
    answerD: "D. for",
    rightAnswer: "d"},
{
    question: "Which event occurs when a user clicks on an HTML element?",
    answerA: "A. onchange",
    answerB: "B. onclick",
    answerC: "C. onmouseclick",
    answerD: "D. onmouseover",
    rightAnswer: "b"},
{
    question: "How do you declare a JavaScript variable?",
    answerA: "A. variable carName",
    answerB: "B. var carName",
    answerC: "C. v carName",
    answerD: "D. declare carName",
    rightAnswer: "b"},
];
// other variables needed
var score = 0;
var timeLeft = 76;
var timerInterval;
var correct;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;

// function to run through the quiz questions and answers
function generateQuestion() {
    endpageEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    answerA.textContent = currentQuestion.answerA;
    answerB.textContent = currentQuestion.answerB;
    answerC.textContent = currentQuestion.answerC;
    answerD.textContent = currentQuestion.answerD;
};

// function to start the quiz
function startQuiz() {
    endpageEl.style.display = "none";
    startEl.style.display = "none";
    generateQuestion();

    // function to start timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    codequizEl.style.display = "block";
}
    // need to take time off the clock for an incorrect answer

// display score
function showScore() {
    codequizEl.style.display = "none";
    endpageEl.style.display = "flex";
    clearInterval(timerInterval);
    inputEl.value = "";
    finalscoreEl.innerHTML = "You scored " + score + " out of " + quizQuestions.length + " correct!";
}
// function here to take the submission and add it to the scoreboard
submitEl.addEventListener("click", function storeScore(){
    event.preventDefault();
    if (inputEl.value === "") {
        alert("Please enter your initials");
        return false;
    } else {
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var currentUser = inputEl.value.trim();
        var currentScore = {
            name : currentUser,
            score : score
        };
        endpageEl.style.display = "none";
        scorePage.style.display = "flex";
        scoreContainer.style.display = "block";
        endpageBtns.style.display = "flex";

        savedScores.push(currentScore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        generateScores();
    }
});

// need a function to clear the list of the scores and generate a new score list from local storage
function generateScores() {
    initialsEl.innerHTML = "";
    scoresEl.innerHTML = ""; 
    var scores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i = 0; i < scores.length; i++) {
        var initialList = document.createElement("li");
        var scoreList = document.createElement("li");
        initialList.textContent = scores[i].name;
        scoreList.textContent = scores[i].score;
        initialsEl.appendChild(initialList);
        scoresEl.appendChild(scoreList);
    }
}

function showScorepage() {
    startEl.style.display = "none";
    endpageEl.style.display = "none";
    scorePage.style.display = "flex";
    scoreContainer.style.display = "block";
    endpageBtns.style.display = "flex";

    generateScores();
}

// clear the local storage of scores and clear text from scoreboard
function clearScore() {
    window.localStorage.clear();
    initialsEl.textContent = "";
    scoresEl.textContent = "";
}

// function to restart the quiz
function restartQuiz() {
    scorePage.style.display = "none";
    endpageEl.style.display = "none"; 
    startEl.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}
// checks answers
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].rightAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuestion();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Incorrect!");
        currentQuestionIndex++;
        generateQuestion();
    }   else {
        showScore();
    }
}

clearScoresBtn.addEventListener("click", clearScore);
// restart button
restartBtn.addEventListener("click", restartQuiz);
// button to start quiz
startbtn.addEventListener("click", startQuiz);
