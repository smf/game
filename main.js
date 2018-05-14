
/*
TO DO 

1 Pintar Quiz
    -Una pregunta
    -3 posibles respuestas 

    -Botón enviar
    -Botón siguiente pregunta aparece disabled


2 Generar pregunta   
    -La pregunta sale de manera aleatoria

3 Generar respuestas
    -Las respuestas salen cada vez ordenadas de una forma distinta

4  Cambio de estado del Botón siguiente pregunta
    -Cuando el usuario selecciona un input y le da al boton enviar el Botón siguiente pregunta 
      se puede pulsar.

5 Validar resultado 
    -Usuario selecciona un input. 
    -hace click en el botón enviar. 
    -Se generan 2 posibles respuestas que hay que pintar: 
        *Pregunta correcta
        *Pregunta fallida

6  Inputs disabled
    -Si antes de 20 segundos el usuario no ha seleccionado ningún input, todos los inputs pasan a disabled

7 Contador
    -Pintar una cuenta atrás desde 20 segundos por cada pregunta. 
    - Opciones: 
        *Si el usuario selecciona un input, el contador se para.
        *Si el usuario no selecciona ningún input el contador llega a cero 
         e imprime un mensaje "Se te ha acabado el tiempo"

8 Boton siguiente pregunta 
    -Cuando el usuario hace click en boton siguiente pregunta: 
        *se genera una nueva pregunta y 3 respuestas
        *cuando se ha terminado el cuestionario: 
            ·se imprime un mensaje Has conseguido 3 puntos
            ·Ya no se pinta siguiente pregunta
            ·sale un input para enviar el nombre y un boton 


*/





function app() {
    "use strict";

    var formQuiz = document.querySelector(".form-quiz");
    var currentQuestionIndex;
    var registerUserNameForm = document.querySelector(".register-username-form");
    var nextButton = document.querySelector(".next-question-button");
    var sendButton = document.querySelector(".send-button");
    var results = document.querySelector('.results');
    sendButton.addEventListener("click", validateAnswer);
    var countDown;
    var timer;
    var totalSuccessQuestions = 0;
    var totalScore = 0;
    var totalTimeAnswerSpeed = 0;
    var savedScores = JSON.parse(localStorage.getItem('listScore')) || [];
     printSavedScores();

    function getQuestions(callback){
        var serverData = [
            {
                question: {id: 1, text: 'Pregunta1'},
                answers: [{id: 1, text: 'A1'}, {id: 2, text: 'A2'}, {id: 3, text: 'A3'}],
                correctAnswerId: 1
                },
            {
                question: {id: 2, text: 'Pregunta2'},
                answers: [{id: 4, text: 'B1'}, {id: 5, text: 'B2'}, {id: 6, text: 'B3'}],
                correctAnswerId: 5
                },
            {
                question: {id: 3, text: 'Pregunta3'},
                answers: [{id: 7, text: 'C1'}, {id: 8, text: 'C2'}, {id: 9, text: 'C3'}],
                correctAnswerId: 9
                },          
            ];
        callback(serverData);
    }

    var questions = [];
    getQuestions(function(data){
        questions = data;
    });


    function start() {
        currentQuestionIndex = generateQuestion();

        printQuestion(currentQuestionIndex);
        printRandomAnswers(currentQuestionIndex);
        countDownStart();
        sendButtonStatus(true);
        nextButtonStatus(true);
        resultStatus(true);
    }

    function generateQuestion(){
        var  quizQuestions = questions.slice(0);
        var questionsRandom = Math.floor(Math.random() * quizQuestions.length);
        return questionsRandom;
    }

    function printRandomAnswers(questionIndex){
        var answers = questions[questionIndex].answers;
        answers.sort(function() { return 0.5 - Math.random()});
        
        for(let answer of answers) {
            let containerAnswer = document.createElement("div");
            containerAnswer.setAttribute("class", "input-group");

            let input = document.createElement("input");
            input.value = answer.id;
            input.setAttribute("id", "answer-" + answer.id);
            input.setAttribute("type", "radio");
            input.setAttribute("name", "answer-quiz");
            input.setAttribute("class", "answer-quiz");
            input.addEventListener("change", handleAnswerChange)
            containerAnswer.appendChild(input);

            let label = document.createElement("label");
            label.innerText = answer.text;
            label.setAttribute("for", "answer-" + answer.id);
            containerAnswer.appendChild(label);

            formQuiz.appendChild(containerAnswer);
        }    
    }

    function handleAnswerChange(event) {
        sendButtonStatus(false);
        stopCountDown();
    }

    function printQuestion(questionIndex) {
        document.querySelector(".form-quiz").style.display = "block";
        var questionDom = document.createElement("h2");
        
        questionDom.innerText = questions[questionIndex].question.text;
        formQuiz.appendChild(questionDom);        
    }

    function validateAnswer() {
        var time = 20 - getCurrentTime();
        var result = getAnswerResult();

        if (result) {
            totalSuccessQuestions++;
            totalScore = scoreSuccessQuestion(totalScore, time);
        } else {
            totalScore = scoreFailQuestion(totalScore, time);

            if (totalScore < 0) {
                totalScore = 0;
            }
        }

        totalTimeAnswerSpeed += time;
        printResult(result);
        sendButtonStatus(true);
        nextButtonStatus(false);
        removeQuiz();
        countDownHide();
    }

    function countDownHide() {
        var counter = document.querySelector(".counter");
        counter.style.display = "none";
    }

    function countDownVisible() {
        var counter = document.querySelector(".counter");
        counter.style.display = "block";
    }

    function getAnswerResult() {
        var radios = document.querySelectorAll(".answer-quiz");
        var currentQuestion = questions[currentQuestionIndex];

        var selectedAnswerId;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                selectedAnswerId = radios[i].value;       
            }
        }  

       return isCorrectAnswer(currentQuestion, selectedAnswerId);
    }

    function isCorrectAnswer(question, userSelectedAnswer) {
        return question.correctAnswerId === parseInt(userSelectedAnswer);
    }

    function removeQuiz() {
        document.querySelector(".form-quiz").style.display = "none";
        document.querySelector(".form-quiz h2").remove();
        var inputs = document.querySelectorAll(".input-group"); 

        for(let input of inputs) {
            input.remove();
        }

        questions.splice(currentQuestionIndex, 1);       
    }

    function printResult(correctAnswer) {
        var containerQuestions = document.querySelector(".main-questions");
        
        var message = document.createElement("p");
        message.setAttribute("class", "message");
 
        containerQuestions.appendChild(message);
 
        if(correctAnswer) {
            message.innerText = "Has acertado";
        } else {
            message.innerText = "Has fallado";
        }
    }

    function resultStatus(hidden) {
        if (hidden) {
            results.style.display = "none";
        } else {
            results.style.display = "block";
        }
    }

    function nextButtonStatus(disabled) {
        if (disabled) {
            nextButton.setAttribute("disabled", disabled);
        } else {
            nextButton.removeAttribute("disabled");
        }
    }

    function sendButtonStatus(disabled) {
        if (disabled) {
            sendButton.setAttribute('disabled', disabled);
        } else {
            sendButton.removeAttribute('disabled');
        }
    }

    function removePrintResult() {
        var message = document.querySelector(".message");
        message.remove();
    }

    function hideAnswerActionButtons() {
        document.querySelector('.send-answer').style.display = 'none';
    }

    function registerUser() {
        registerUserNameForm.classList.add("visible"); 

        document.querySelector(".total-score").innerText = totalScore;
        hideAnswerActionButtons();
    }
  
    nextButton.addEventListener("click", function() {     
        stopCountDown();

        if(questions.length > 0) {
            start();
            countDownVisible()
            removePrintResult();
        } else {
            removePrintResult();
            registerUser();
            showResults();
        }
    });

    function showResults() {
        resultStatus(false);

        var avgSpeed = document.querySelector(".avg-speed");
        var totalSuccess = document.querySelector(".total-success");
        var totalFails = document.querySelector(".total-fail");

        totalSuccess.innerText = totalSuccessQuestions;
        totalFails.innerText = 3 - totalSuccessQuestions;
        avgSpeed.innerText = totalTimeAnswerSpeed / 3;
    }

    function countDownStart() {
        defineCountDown();
        printCountDown();
        activateCountDown();   
    }

    function defineCountDown(){
        countDown = 20;
    }

    function activateCountDown() {
        timer = setInterval(updateCountDown, 1000);
    }

    function printCountDown() {
        var counterDom = document.querySelector(".counter-num");
        counterDom.innerHTML = countDown;
    }

    function updateCountDown() {
        countDown--;

        printCountDown();

        if(countDown === 0 ) { 
            stopCountDown();
            totalScore = scoreNotAnsweredQuestion(totalScore);
        }
    }

    function stopCountDown(){
        clearInterval(timer);
    }
    
    function getCurrentTime() {
        return parseInt(document.querySelector(".counter-num").innerText, 10);
    }

    function scoreSuccessQuestion(score, time) {
        if (time <= 2) {
            return score + 2;
        }
        if (time <= 10) {
            return score + 1;
        }

        return score;
    }

    function scoreFailQuestion(score, time) {
        if (time <= 10) {
            return score - 1;
        }
        
        return score - 2;
    }
    
    function scoreNotAnsweredQuestion(score) {
        return score - 3;
    }

    registerUserNameForm.addEventListener('submit', scoreBoardUser);

    function scoreBoardUser(e) {
        e.preventDefault();
 
        var scoreBoardTable = document.querySelector(".points-table tbody");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var userInput = document.querySelector(".register-user-input").value;
        td.innerText = userInput;
        tr.appendChild(td);

        var scoreBoardUserPoints = {
            name : userInput,
            points: totalScore
        }

        savedScores.push(scoreBoardUserPoints);
        localStorage.setItem('listScore', JSON.stringify(savedScores));
       
        var tdScore = document.createElement("td");
        tdScore.innerText = totalScore;      
        tr.appendChild(tdScore);
        scoreBoardTable.appendChild(tr);

    }

    function printSavedScores() {
        for(let scoreBoardUserPoint of savedScores) {
            var scoreBoardTable = document.querySelector(".points-table tbody");
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerText = scoreBoardUserPoint.name;
            tr.appendChild(td);

            var tdScore = document.createElement("td");
            tdScore.innerText = scoreBoardUserPoint.points;     
            tr.appendChild(tdScore);
            scoreBoardTable.appendChild(tr);  
        }
    }

    return {
        start : start
    };    
}
