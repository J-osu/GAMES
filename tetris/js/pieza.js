//--------------------------------------------------
//       PIEZAS (7 EN TOTAL) Z,S,L,I,T,O,J
//--------------------------------------------------
import {
  constantes,
  controles,
  objeto,
  varias,
  estado
} from "./constants.js";

import {
  draw_canvas,
  check_colisiones,
  dejar_rastro_pieza,
  ir_al_gameOver
} from "./funtions.js";

// ---------------------------------------------------------------------
export class Pieza {

  constructor(x, y, idPieza, coloresPieza) {

    console.log(x, y, idPieza);
    this.x = x;
    this.y = y;
    this.idPieza = idPieza;
    this.coloresPieza = coloresPieza;
    this.rotacion = 0;
  }

  static plantilla = {
    z: [[0, 0], [0, -1], [-1, -1], [1, 0],
      [0, 0], [0, -1], [-1, 0], [-1, 1],
      [0, 0], [0, -1], [-1, -1], [1, 0],
      [0, 0], [0, -1], [-1, 0], [-1, 1]
    ],
    s: [[0, 0], [0, -1], [1, -1], [-1, 0],
      [0, 0], [0, 1], [-1, -1], [-1, 0],
      [0, 0], [0, -1], [1, -1], [-1, 0],
      [0, 0], [0, 1], [-1, -1], [-1, 0]
    ],
    l: [[0, 0], [0, -1], [0, -2], [1, 0],
      [0, 0], [-1, 0], [1, 0], [1, -1],
      [0, 0], [0, -1], [0, -2], [-1, -2],
      [0, 0], [0, -1], [1, -1], [2, -1]
    ],
    j: [[0, 0], [1, 0], [1, -1], [1, -2],
      [0, 0], [0, -1], [-1, -1], [-2, -1],
      [0, 0], [0, -1], [0, -2], [1, -2],
      [0, 0], [0, -1], [1, 0], [2, 0]
    ],
    o: [[0, 0], [0, -1], [1, -1], [1, 0],
      [0, 0], [0, -1], [1, -1], [1, 0],
      [0, 0], [0, -1], [1, -1], [1, 0],
      [0, 0], [0, -1], [1, -1], [1, 0]
    ],
    i: [[0, 0], [-1, 0], [1, 0], [2, 0],
      [0, 0], [0, -1], [0, -2], [0, -3],
      [0, 0], [-1, 0], [1, 0], [2, 0],
      [0, 0], [0, -1], [0, -2], [0, -3]
    ],
    t: [[0, 0], [0, -1], [-1, 0], [1, 0],
      [0, 0], [0, -1], [0, -2], [-1, -1],
      [0, 0], [-1, 0], [1, 0], [0, 1],
      [0, 0], [0, -1], [0, -2], [1, -1]
    ],
  };

  static incr_dificultad_caePieza() {

    const dificultad = varias.dificultad_caer[objeto.scores.nivel];
    console.log(dificultad);

    clearInterval(varias.cae_pieza);

    varias.cae_pieza = setInterval(() => {
      if (constantes.gravedad) controles.teclaAbajo = true;
    }, dificultad);
  }

  dibuja_pieza() {

    this.actualiza_pieza();

    const idPieza = this.idPieza;
    const ancho = constantes.tileY;
    const alto = constantes.tileY;

    const parte_array = this.rotacion * 4;
    let rotacion_idPieza = idPieza.slice(parte_array, parte_array + 4);

    for (let relPos of rotacion_idPieza) {

      const x = (this.x + relPos[0]) * constantes.tileX;
      const y = (this.y + relPos[1]) * constantes.tileY;

      draw_canvas(x, y, ancho, alto, this.coloresPieza);
    }
  }

  actualiza_pieza() {

    if (!estado.enJuego) return;

    if (controles.teclaIzquierda) {

      this.x --;
      const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
      if (colision) this.x ++;
      controles.teclaIzquierda = false;

    } else if (controles.teclaDerecha) {

      this.x ++;
      const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
      if (colision) this.x--;
      controles.teclaDerecha = false;

    } else if (controles.teclaAbajo) {

      this.y ++;
      const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
      if (colision) {
        this.y--;

        if (this.y <= constantes.yInicial) {
          ir_al_gameOver();
        }

        varias.otra_pieza = true;
        dejar_rastro_pieza(this.x, this.y, this.idPieza, this.rotacion);
      }

      controles.teclaAbajo = false;

    } else if (controles.teclaRotar) {

      const bck_rotacion = this.rotacion;
      this.rotacion ++;
      if (this.rotacion >= 4) this.rotacion = 0;

      const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
      if (colision) {
        console.log('No es posible rotar...');
        this.rotacion = bck_rotacion;
      }

      controles.teclaRotar = false;
    }
  }
}
