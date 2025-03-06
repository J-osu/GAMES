// ---------------------------------------------------------------------
//  Clase Next (Mostrar siguiente pieza)
//
// ---------------------------------------------------------------------
import { constantes } from './constants.js';
import { draw_canvas } from './funtions.js';

// ---------------------------------------------------------------------
export class nextPieza {

  constructor(x, y, idPieza, coloresPieza) {

    this.x = x;
    this.y = y;
    this.idPieza = idPieza;
    this.coloresPieza = coloresPieza;
  }

  dibuja() {

    const ancho = constantes.tileY;
    const alto = constantes.tileY;

    let rotacion_idPieza = this.idPieza.slice(0, 4);

    for (let relPos of rotacion_idPieza) {

      const x = (this.x + relPos[0]) * constantes.tileX;
      const y = (this.y + relPos[1]) * constantes.tileY;

      draw_canvas(x, y, ancho, alto, this.coloresPieza);
    }
  }
}
