const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const total=document.getElementById("total-question");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer =0;
let attempt = 0;


//push the questions into availableQuestions array
function setAvailableQuestions(){
    const tootalQuestions = quiz.length;
    for(let i=0; i<tootalQuestions;i++){
        availableQuestions.push(quiz[i])
    }
}


//set question number,question and answer
function getNewQuestions(){
    //set question number
    questionNumber.innerHTML = "Question" +(questionCounter + 1) + " : " ;
    
    //set question text get random questions
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of questionIndex from availableQuestions array
    const index1 = availableQuestions.indexOf(questionIndex);

    //remove the questionIndex from availableQuestions array
    availableQuestions.splice(index1,1);

    //set options get the length of options
    const optionLen = currentQuestion.options.length;

    //put options into availableOptions array
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i);
    } 

    optionContainer.innerHTML ='';
    let animationDelay = 0.15;
    //create option in html
    for(let i=0 ; i<optionLen;i++){
        //random options
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        //get the position of optionIndex from availableOptions
        const index2 = availableOptions.indexOf(optionIndex);

        //remove the optionIndex from availableOptions
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");

       

    }

    questionCounter++;
}




//get the result of current question
function getResult(element){
    const id = parseInt(element.id);

    //get the ans by comparing the clicked option
    if(id === currentQuestion.answer){
        //set the green color to the correct option
        element.classList.add("correct");
       

        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswer++;

    }
    else{
        //set the red color to the wrong option
        element.classList.add("wrong");

        //add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is wrong then show the correct answer
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    
}


function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestions = quiz.length;
    for(let i=0;i<totalQuestions; i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}


function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}


function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestions();
    }
}


//This function is for after last question , result page will come.
function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");

    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}


//get the quiz Result
function quizResult(){
	document.getElementById("total-question").innerHTML = quiz.length;
	document.getElementById("attempt").innerHTML = attempt;
	document.getElementById("correct").innerHTML = correctAnswer;
	document.getElementById("yourscore").innerHTML = correctAnswer + " / " + quiz.length;
    

}


function resetQuiz(){
     questionCounter = 0;
     correctAnswer =0;
     attempt = 0;
}


function tryAgainQuiz(){
    //hide the result box
    resultBox.classList.add("hide");

    //show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}


function backToHome(){
    //hide result box
    resultBox.classList.add("hide");

    //show the home box
    homeBox.classList.remove("hide");
    resetQuiz();
}


function startQuiz(){

    //hide home box
    homeBox.classList.add("hide");

    //show quiz box
    quizBox.classList.remove("hide");
    //we will set all questions in availableQuestions array
    setAvailableQuestions();

    //we will call getNewQuestions() function
    getNewQuestions();

    //to create indicator of answer
    answerIndicator();

}


window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}


