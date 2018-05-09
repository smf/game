
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
        *se borra la pregunta y respuesta anterior
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
            input.setAttribute("type", "radio");
            input.setAttribute("name", "answer-quiz");
            input.setAttribute("class", "answer-quiz");
            containerAnswer.appendChild(input);

            let label = document.createElement("label");
            label.innerText = answer.text;
            containerAnswer.appendChild(label);

            formQuiz.appendChild(containerAnswer);
        } 
        
    }
    

    function printQuestion(questionIndex) {
        var questionDom = document.createElement("h2");
        
        questionDom.innerText = questions[questionIndex].question.text;
        formQuiz.appendChild(questionDom);        
    }

    var sendButton = document.querySelector(".send-button");
    sendButton.addEventListener("click", validateAnswer);


    function validateAnswer() {
        var result = getAnswerResult();
        removeResult();
        printResult(result);
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


    function removeResult() {
        document.querySelector(".form-quiz h2").remove();
        var inputs = document.querySelectorAll(".input-group"); 

        for(let input of inputs) {
            input.remove();
        }
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


   
    start();
    
}

app();






