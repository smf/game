/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
*
*      Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*          (0 puntos, pregunta correcta, 1 segundo) -> 2 puntos
*          (1 punto, correcta, 1 segundo) -> 3 puntos
*      Si fallo pregunta en mas de 10 segundos - resto 2 puntos
       Si fallo antes de 10 segundos - resto 1 punto
*      Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
            (1 punto, correcta, 5 segundos) -> 2 puntos
*      Si acierto y tardo mas de 10 segundos - 0 puntos
*      No se puede pasar sin responder
*      Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 puntos
*          
*
* */


describe('calculo de marcador', function() {
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

  it("suma mas puntos si acierta en t <= 2", function() {
      expect(recalcularAcertandoPregunta(0, 1)).toBe(2);
      expect(recalcularAcertandoPregunta(2, 1)).toBe(4);
  });
  it("suma menos puntos si acierta en t > 2 y t <= 10", function() {
      expect(recalcularAcertandoPregunta(0, 5)).toBe(1);
      expect(recalcularAcertandoPregunta(2, 10)).toBe(3);
  });
  it("suma menos puntos si acierta en t > 10", function() {
      expect(recalcularAcertandoPregunta(0, 11)).toBe(0);
      expect(recalcularAcertandoPregunta(2, 11)).toBe(2);
  });
  it("resta menos puntos si pierde en t <= 10", function() {
      expect(recalcularFallandoPregunta(0, 5)).toBe(-1);
      expect(recalcularFallandoPregunta(2, 10)).toBe(1);
  });
  it("resta mas puntos si pierde en < 20", function() {
      expect(recalcularFallandoPregunta(0, 11)).toBe(-2);
      expect(recalcularFallandoPregunta(2, 18)).toBe(0);
  });
  it("resta puntos si no hay respuesta", function() {
      expect(recalcularSinRespuesta(0)).toBe(-3);
      expect(recalcularSinRespuesta(20)).toBe(17);
  });
});


/* 

describe('comprobador de respuestas', function() {
  function isCorrect(question, userSelectedAnswer) {
      if(question.id !== userSelectedAnswer.questionId) {
          return false;
      }
      if (userSelectedAnswer.id !== question.correctAnswer.id) {
          return false;
      }
      return true;
  }
  it("reconoce una pregunta correcta", function() {
      expect(isCorrect({
                      id: 1,
                      question: '¿Cual es la capital de Portugal?',
                      answers: [
                          {id: 1, value: 'Faro'},
                          {id: 2, value: 'Oporto'},
                          {id: 3, value: 'Lisboa'},
                      ],
                      correctAnswer: {id: 3}
                  },
                  {questionId: 1, id: 3 })
          ).toBeTruthy();
      });
  it("reconoce una pregunta incorrecta", function() {
      expect(isCorrect({
                      id: 1,
                      question: '¿Cual es la capital de Portugal?',
                      answers: [
                          {id: 1, value: 'Faro'},
                          {id: 2, value: 'Oporto'},
                          {id: 3, value: 'Lisboa'},
                      ],
                      correctAnswer: {id: 3}
                  },
                  {questionId: 1, id: 2 })
      ).toBeFalsy();
  });

  it("reconoce una respuesta que no corresponde a la pregunta", function() {
      expect(isCorrect({
                  id: 1,
                  question: '¿Cual es la capital de Portugal?',
                  answers: [
                      {id: 1, value: 'Faro'},
                      {id: 2, value: 'Oporto'},
                      {id: 3, value: 'Lisboa'},
                  ],
                  correctAnswer: {id: 3}
              },
              {questionId: 5, id: 3 })
      ).toBeFalsy();
  });
}); */


describe('comprobador de respuestas', function() {
  var question = {
    id: 1,
    question: '¿Cual es la capital de Portugal?',
    answers: [
        {id: 1, value: 'Faro'},
        {id: 2, value: 'Oporto'},
        {id: 3, value: 'Lisboa'},
    ],
    correctAnswer: 3
  };

  it("reconoce una pregunta correcta", function() {
      expect(isCorrectAnswer(question, 3)).toBeTruthy();
  });

  it("reconoce una pregunta incorrecta", function() {
      expect(isCorrectAnswer(question, 2)).toBeFalsy();
  });

  it("reconoce una respuesta que se correponde con la pregunta", function() {
      const answer = {
        questionId: 1,
        answerId: 3
      };

      expect(isValidAnswer(question, answer)).toBeTruthy();
  });
  
  it("reconoce una respuesta que no corresponde a la pregunta", function() {
    const answer = {
      questionId: 2,
      answerId: 3
    };
    
    expect(isValidAnswer(question, answer)).toBeFalsy();
  });
});


describe('mostrar preguntas', function() {
    var questions;
    beforeEach (function() {
        spyOn(console, "log");
        getQuestions(function(data){
          questions = data;
        });
    });

    it("mostrar la pregunta con un determinado id", function() {

        pickQuestion(questions, 3);
        expect(console.log).toHaveBeenCalled();
        // expect(console.log).toHaveBeenCalledWith('¿Cual es la capital de Italia?');
    });

    it("mostrar pregunta aleatoria", function() {

        pickQuestion(questions);
        expect(console.log).toHaveBeenCalled();
    });
  
  });
  
  



