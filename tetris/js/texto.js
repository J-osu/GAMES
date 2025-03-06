// ---------------------------------------------------------------------
//  Clase Marcadores ( Lineas, nivel )
//
// ---------------------------------------------------------------------
import {
  elementosDom as ed,
  estado
} from "./constants.js";

// ---------------------------------------------------------------------
export class Textos {

  constructor(x, y, txt, size, align, color, estado) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.size = size;
    this.align = align;
    this.color = color;
    this.estado = estado;
    this.colorBlur = 'white';
    this.selectBlur();
  }

  mostrar_txt() {

    if (!estado[this.estado]) return;

    ed.ctx.save();
    ed.ctx.font = this.size.toString() + 'px impact';
    ed.ctx.shadowColor = this.colorBlur;
    ed.ctx.shadowBlur = 17;
    ed.ctx.fillStyle = this.color;
    ed.ctx.textAlign = this.align;
    ed.ctx.fillText(this.txt, this.x, this.y);
    ed.ctx.restore();
  }

  selectBlur() {

    if (this.estado === 'menu_principal') this.colorBlur = 'white';
    if (this.estado === 'entreNiveles') this.colorBlur = 'orange';
    if (this.estado === 'game_over') this.colorBlur = 'lightgreen';
    //if (this.estado === 'rejugar') this.colorBlur = 'lightyellow';
  }
}
