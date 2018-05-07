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
    ]
    callback(serverData);
};
// La teneis que usar pasando un callback, o sea una funcion:
// Ejemplo de uso:


  function pickQuestion(questions, questionId) {
    var id = questionId || 1 + Math.round(Math.random() * (questions.length - 1));

    for(let question of questions) {
        if(question.question.id === id) {
            // console.log(showQuestion(question));
            return question;
            // showAnswers(question.answers, true);
            // break;    
        }
    }
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
        [shuffledArray[counter], shuffledArray[index]] = [shuffledArray[index], shuffledArray[counter]];
    }
    return shuffledArray;
  }

  function isCorrectAnswer(question, userSelectedAnswer) {
      return userSelectedAnswer === question.correctAnswer;
  }

  function isValidAnswer(question, userSelectedAnswer) {
    return question.id === userSelectedAnswer.questionId;
  }

function start() {
    var questions, intervalID;
    getQuestions((data) => {
        questions = shuffle(data)
    })

    printQuestion(questions.pop());
    // intervalID = setInterval(() => {
    //     if(questions.length > 0) {
    //         printQuestion(questions.pop())
    //     }
    //     else {
    //         stop(intervalID);
    //     }

    // }, 5000)
}

function stop(intervalID) {
    document.querySelectorAll('.main-questions form *').forEach(item=>item.remove())
    document.querySelector('.question').innerHTML = '¡Tiempo!'
    document.querySelector('.progressbar').classList.add('hidden');
    clearInterval(intervalID);
}

function printQuestion(question) {
    const questionText = document.querySelector('.question')
    const form = document.querySelector('.main-questions form')
    const radios = document.querySelectorAll('input[type=radio]')
    const progress = document.querySelector('progress')
    const labels = document.querySelectorAll('label')
    radios.forEach(radio => radio.remove())
    labels.forEach(label => label.remove())
    questionText.innerHTML = showQuestion(question)
    document.querySelector('.progressbar').classList.remove('hidden');

    shuffle(question.answers).forEach(answer => {
        var input = document.createElement('input'),
            label = document.createElement('label')
        label.innerHTML = answer.text
        input.setAttribute('type','radio')
        input.setAttribute('name', 'answer')
        input.id = "answer" + answer.id
        label.setAttribute('for', "answer" + answer.id)
        input.value = answer.id
        form.appendChild(input)
        form.appendChild(label)
    })
    let index = 20;
    progress.value = index;
    let intervalID = setInterval(() => {
        if(index > 0) {
            index -= 0.01;
            progress.value = index;
        }
        else {
            document.querySelectorAll('input[type=radio]')
            .forEach(radio => radio.setAttribute('disabled', true))
            clearInterval(intervalID);
        }
    }, 10);
}