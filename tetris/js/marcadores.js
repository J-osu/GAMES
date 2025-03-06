// ---------------------------------------------------------------------
//  Clase Marcadores ( Lineas, nivel )
//
// ---------------------------------------------------------------------
import { elementosDom as ed, colores } from "./constants.js";

// ---------------------------------------------------------------------
export class Marcadores {

  constructor(lineas, nivel, record) {
    this._lineas = lineas;
    this._nivel = nivel;
    this._record = record;
  }

  mostrar_marcadores() {

    const sizeText = 15;
    let x = 10;
    let y = sizeText;
    const lineasTxt = 'Lineas: ' + this._lineas.toString();

    ed.ctx.save();
    ed.ctx.font = sizeText.toString() + 'px impact';
    ed.ctx.shadowColor = 'lightyellow';
    ed.ctx.shadowBlur = 14;
    ed.ctx.fillStyle = colores.colorPiezas2[0][3];
    ed.ctx.textAlign = 'left';
    ed.ctx.fillText(lineasTxt, x, y);

    // -----------------------------------------------------
    x = ed.canvas.width / 2;
    const nivelTxt = 'Nivel: ' + this._nivel.toString();

    ed.ctx.fillStyle = colores.colorPiezas2[0][0];
    ed.ctx.textAlign = 'center';
    ed.ctx.fillText(nivelTxt, x, y);

    // -----------------------------------------------------
    x = Math.floor(ed.canvas.width / 1.4);
    const recordTxt = 'Record: ' + this._record.toString();

    ed.ctx.fillStyle = colores.colorPiezas2[0][1];
    ed.ctx.textAlign = 'left';
    ed.ctx.fillText(recordTxt, x, y);
    ed.ctx.restore();
  }

  get lineas() {
    return this._lineas;
  }

  set lineas(updateLineas) {
    this._lineas = updateLineas;
  }

  get nivel() {
    return this._nivel;
  }

  set nivel(updateNivel) {
    this._nivel = updateNivel;
  }

  get record() {
    return this._record;
  }

  set record(updateRecord) {
    this._record = updateRecord;
  }
}
