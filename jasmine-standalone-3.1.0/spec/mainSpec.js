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


describe('calculo de marcador', function(){
  // function recalcularMarcador(puntos, esCorrecta, tiempo){
  //     if (esCorrecta && tiempo <= 2){
  //         return puntos + 2;
  //     } else if (!esCorrecta && tiempo > 10 && tiempo < 19) {
  //         return puntos - 2;
  //     } else if (!esCorrecta && tiempo < 10 && tiempo > 2) {
  //         return puntos - 1;
  //     } else if (esCorrecta && tiempo > 2 && tiempo < 10) {
  //         return puntos + 1;
  //     } else if (esCorrecta && tiempo > 10) {
  //         return puntos;
  //     } else if (!esCorrecta && tiempo >= 20) {
  //         return puntos - 3;
  //     }
  // }

  function recalcularMarcador(puntos, esCorrecta, tiempo) {
    if(esCorrecta) {
      if(tiempo <= 2) {
        return puntos + 2;
      } else if(tiempo < 10 && tiempo > 2) {
        return puntos + 1;
      } else { 
        return puntos;
      }
    } else {
      if(tiempo < 10 && tiempo > 2) {
        return puntos - 1;
      } else if(tiempo > 10 && tiempo < 19) {
        return puntos - 2;
      } else {
        return puntos - 3;
      }
    
    }
  }

  it("suma mas puntos si acierta muy rapido", function(){
      expect(recalcularMarcador(0, true, 1)).toBe(2);
      expect(recalcularMarcador(2, true, 1)).toBe(4);
  });

  it("resto puntos si fallo en función del tiempo que tarde en responder", function(){
    expect(recalcularMarcador(5, false, 12)).toBe(3);
    expect(recalcularMarcador(7, false, 8)).toBe(6);
  });

  it("puntos si acierto", function(){
    expect(recalcularMarcador(5, true, 6)).toBe(6);
    expect(recalcularMarcador(1, true, 15)).toBe(1);
  });

  it("es obligatorio responder a una pregunta", function(){
    expect(recalcularMarcador(5, null, 20)).toBe(2);
  });
 
});