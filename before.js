
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
    var container = document.querySelector(".main-questions");
    const message = document.querySelector(".send-answer h3");
    

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

         message.innerHTML = 'Resultado ' + 'tienes ';

    });

    sendButton.addEventListener("click", clickSendButton.bind(null, question));
    // sendButton.addEventListener("click", () => {
    //     clickSendButton(question);
    // });
    handleProgressBar();

}

function stop() {
    document.querySelectorAll('.main-questions form *').forEach(item=>item.remove());
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
        var input = document.createElement('input'),
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


function clickSendButton(question) {
    var selectedUserAnswer = document.querySelector("input[type=radio]:checked").value;
    const message = document.querySelector(".send-answer h3");

        if(isCorrectAnswer(question, parseInt(selectedUserAnswer))){
            message.innerHTML = "Correcto, has acertado!";
        
        } else {
            message.innerHTML = "Has fallado";
        }
        nextButton.disabled = false;
        sendButton.disabled = true;
        clearInterval(intervalID);
}


function handleProgressBar() {

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

}
