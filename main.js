function recalcularAcertandoPregunta(marcador, tiempo) {
    if (tiempo <= 2) {
        return marcador + 2;
    }
    if (tiempo <= 10) {
        return marcador + 1;
    }
    if (tiempo > 10){
        return marcador;
    }
}


function recalcularFallandoPregunta(marcador, tiempo) {
    if (tiempo <= 10) {
        return marcador - 1;
    }
    if (tiempo < 20) {
        return marcador - 2;
    }
}

function recalcularSinRespuesta(marcador) {
    return marcador - 3;
}




//   const questions = [
//       {
//         id: 1,
//         question: '¿Cual es la capital de Portugal?',
//         answers: [
//             {id: 1, value: 'Faro'},
//             {id: 2, value: 'Oporto'},
//             {id: 3, value: 'Lisboa'},
//         ],
//         correctAnswer: 3
//     }, 
    
//     {
//         id: 2,
//         question: '¿Cual es la capital de Francia?',
//         answers: [
//             {id: 1, value: 'Faro'},
//             {id: 2, value: 'Paris'},
//             {id: 3, value: 'Roma'},
//         ],
//         correctAnswer: 2
//     },

//     {
//         id: 3,
//         question: '¿Cual es la capital de Italia?',
//         answers: [
//             {id: 1, value: 'Roma'},
//             {id: 2, value: 'Paris'},
//             {id: 3, value: 'Madrid'},
//         ],
//         correctAnswer: 1
//     }
// ]

// La defincion de la funcion, copiar y pegar en vuestro codigo:


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


function showQuestion(question) {
    return question.question.text;
}


function showAnswers(answers, random) {

    if(random) {
        showRandomAnswers(answers);
    } else {
        for(let answer of answers) {
            console.log(answer.text);
        }
    }
}

function showRandomAnswers(answers) {

    var randomIndex;
    var answersLeft = answers.slice(0);

    while(answersLeft.length > 0) {
        randomIndex = Math.floor(Math.random() * answersLeft.length);
        console.log(answersLeft.splice(randomIndex, 1)[0].text);
    }
}

function shuffle(array) {
    let shuffledArray = array.slice(0);
    let counter = shuffledArray.length;


    while(counter > 0){
        let index = Math.floor(Math.random() * counter);
        counter--;
        [
            shuffledArray[counter],
            shuffledArray[index]
        ] = [
            shuffledArray[index],
            shuffledArray[counter]
        ];

        //  var temp = shuffleArray[counter];
        //  shuffleArray[counter] =  shuffleArray[index];
        //  shuffleArray[index] = temp;
        }
    return shuffledArray;
}


function isCorrectAnswer(question, userSelectedAnswer) {
    return userSelectedAnswer === question.correctAnswerId;
}

function isValidAnswer(question, userSelectedAnswer) {
    return question.id === userSelectedAnswer.questionId;
}

function start() {
    var questions, intervalID;
    var nextButton = document.querySelector(".next-question-button");
    var sendButton = document.querySelector(".send-button");
    const  message = document.querySelector(".send-answer h3");
    

    getQuestions((data) => {
        questions = shuffle(data);
    });
    var question;
    question = questions.pop();
    printQuestion(question);

    nextButton.addEventListener("click", function(){

        if(questions.length > 0) {
            question = questions.pop();
            printQuestion(question);
            sendButton.disabled = !sendButton.disabled;
            nextButton.disabled = !nextButton.disabled;
        } else {

            stop();
        }

        // message.innerHTML = 'Resultado ' + 'tienes ';

    });
    intervalID = handleProgressBar(nextButton, sendButton, message);

    sendButton.addEventListener("click", clickSendButton.bind(null, question, nextButton, sendButton, intervalID));
    // sendButton.addEventListener("click", () => {
    //     clickSendButton(question);
    // });

}


function stop() {
    document.querySelectorAll('.main-questions form *').forEach(item=>item.remove());
    /* 
    const form = document.querySelector('.main-questions form')
    while(form.lastChild) form.removeChild(form.lastChild)
    */
    document.querySelector('.question').innerHTML = '¡Tiempo!';
    document.querySelector('.progressbar').classList.add('hidden');
}

function printQuestion(question) {
    const questionText = document.querySelector('.question');
    const form         = document.querySelector('.form-quiz');
    const formControls = document.querySelectorAll('form div.group');

    formControls.forEach(control => control.remove());
    questionText.innerHTML = showQuestion(question);

    document.querySelector('.progressbar').classList.remove('hidden');

    shuffle(question.answers).forEach(answer => {
        var     input = document.createElement('input'),
                label = document.createElement('label'),
            container = document.createElement('div');

        label.innerHTML = answer.text
        input.setAttribute('type','radio')
        input.setAttribute('name', 'answer')
        input.id = "answer" + answer.id
        label.setAttribute('for', "answer" + answer.id)
        input.value = answer.id
        container.classList.add('group')
        container.appendChild(input)
        container.appendChild(label)
        form.appendChild(container)
    });
    
}


function clickSendButton(question, nextButton, sendButton, intervalID) {
    var selectedUserAnswer = document.querySelector("input[type=radio]:checked");
    if (!selectedUserAnswer) return;
    selectedUserAnswer = selectedUserAnswer.value;
    const message = document.querySelector(".send-answer h3");

        if (isCorrectAnswer(question, parseInt(selectedUserAnswer))) {
            message.innerHTML = "Correcto, has acertado!";
        }
        else {
            message.innerHTML = "Has fallado";
        }
        nextButton.disabled = false;
        sendButton.disabled = true;
        clearInterval(intervalID);
}


function handleProgressBar(nextButton, sendButton, message) {

    const progress = document.querySelector('progress');
    let timer = 20;
    progress.value = timer;
    let intervalID = setInterval(progressBar, 10);   

    function progressBar() {
       
        if(timer > 0) {
            timer -= 0.01;
            progress.value = timer;
        }
        else {
            document.querySelectorAll('input[type=radio]')
            .forEach(radio => radio.setAttribute('disabled', true));
            nextButton.disabled = false;
            sendButton.setAttribute("disabled", true);
            message.innerHTML = "Se te pasó el tiempo, siguiente pregunta!"
            clearInterval(intervalID);
        }
    }
    return intervalID;

}
