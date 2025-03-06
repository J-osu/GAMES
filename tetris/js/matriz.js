// ---------------------------------------------------------------------
//  Clase MatrizFondo (0 = vacio, != 0 No vacio)
//
// ---------------------------------------------------------------------
import {
  colores,
  constantes,
  elementosDom as ed,
  objeto,
  sonido
} from "./constants.js";

import { actualizar_matrizFondo } from "./funtions.js";

// ------------------------------------------------------------------------
export class MatrizFondo {

  constructor(columna, fila) {

    this.columna = columna;
    this.fila = fila;
    this.valor = 0;
  }

  static check_lineDone() {

    const filas = constantes.filas;

    for (let i = filas - 1; i > 0; i --) {

      const matrizLinea = objeto.matrizFondo[i];
      //console.log(matrizLinea);

      let contador_cols = 0;

      for (let cols of matrizLinea) {
        if (cols.valor != 0) contador_cols ++;
      }

      if (contador_cols === matrizLinea.length) {
        sonido.lineaHecha.play();
        objeto.scores.lineas ++;
        actualizar_matrizFondo(i);
      }
    }
  }

  dibuja() {

    const x = this.columna * constantes.tileX;
    const y = this.fila * constantes.tileY;
    const posMatriz = objeto.matrizFondo[this.fila][this.columna];

    if (posMatriz.valor === 0) {

      ed.ctx.fillStyle = colores.fondo_canvas;
      ed.ctx.fillRect(x, y, constantes.tileX, constantes.tileY);

    } else if (posMatriz.valor != 0) {

      ed.ctx.fillStyle = colores.rastro_pieza;
      ed.ctx.fillRect(x, y, constantes.tileX, constantes.tileY);
    }
  }
}
