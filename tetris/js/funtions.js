//--------------------------------------------------
//        FUNCIONES VARIAS
//--------------------------------------------------
import {
  elementosDom as ed,
  colores,
  constantes,
  marcadores,
  estado,
  objeto,
  varias,
  sonido
} from './constants.js';

import { Pieza } from './pieza.js';
import { MatrizFondo } from './matriz.js';
import { Textos } from './texto.js';
import { nextPieza } from './next.js';

// =============================================================================
function instanciar_matrizFondo() {

  const filas = constantes.filas;
  const columnas = constantes.columnas;

  const matriz = new Array(filas);

  for (let i = 0; i < matriz.length; i ++) {
    matriz[i] = new Array(columnas).fill(0);
  }

  console.log(matriz);
  // ---------------------------------------------------------
  objeto.matrizFondo = matriz;

  for (let i = 0; i < filas; i ++) {
    for (let ii = 0; ii < columnas; ii ++) {

      objeto.matrizFondo[i][ii] = new MatrizFondo(ii, i);
    }
  }

  return objeto.matrizFondo;
}

// =============================================================================
function instanciar_pieza() {

  varias.otra_pieza = false;

  const x = constantes.xInicial;
  const y = constantes.yInicial;
  const nx = constantes.xNextInicial;
  const ny = constantes.yNextInicial;
  const piezas = constantes.piezas;
  const color = colores.colorPiezas2;

  let nro_rnd = varias.next_pieza;
  const elegida = piezas.charAt(nro_rnd);
  const idPieza = Pieza.plantilla[elegida];
  const coloresPieza = color[nro_rnd];

  // ----------------------------------------------------
  nro_rnd = Math.floor(Math.random() * piezas.length);
  varias.next_pieza = nro_rnd;
  const elegidaNext = piezas.charAt(nro_rnd);
  const idNext = Pieza.plantilla[elegidaNext];
  const colorNext = color[nro_rnd];

  // Instanciar NextPieza (para ver) --------------------
  const verNextPieza = new nextPieza(nx, ny, idNext, colorNext);

  // Instanciar Pieza -----------------------------------
  const pieza = new Pieza(x, y, idPieza, coloresPieza);

  return [pieza, verNextPieza];
}

// =============================================================================
function draw_canvas(x, y, ancho, alto, coloresPieza) {

  ed.ctx.beginPath();
  ed.ctx.fillStyle = coloresPieza[2];
  ed.ctx.moveTo(x, y);
  ed.ctx.lineTo(x + ancho, y + alto);
  ed.ctx.lineTo(x, y + alto);
  ed.ctx.lineTo(x, y);
  ed.ctx.fill();
  ed.ctx.closePath();

  ed.ctx.beginPath();
  ed.ctx.fillStyle = coloresPieza[0];
  ed.ctx.moveTo(x, y);
  ed.ctx.lineTo(x + ancho, y);
  ed.ctx.lineTo(x + ancho, y + alto);
  ed.ctx.lineTo(x, y);
  ed.ctx.fill();
  ed.ctx.closePath();
}

// =============================================================================
function check_colisiones(x, y, idPieza, rotacion) {

  let colX = x;
  let colY = y;
  const parte_array = rotacion * 4;
  let rotacion_idPieza = idPieza.slice(parte_array, parte_array + 4);

  for (let relPos of rotacion_idPieza) {

    colX = x + relPos[0];
    colY = y + relPos[1];
    if (colX >= constantes.columnas || colX < 0) return true;
    if (colY >= constantes.filas || colY < 0) return true;

    const posMatriz = objeto.matrizFondo[colY][colX];
    if (posMatriz.valor != 0) return true;
  }

  return false;
}

// =============================================================================
function dejar_rastro_pieza(x, y, idPieza, rotacion) {

  let colX = x;
  let colY = y;
  const parte_array = rotacion * 4;
  let rotacion_idPieza = idPieza.slice(parte_array, parte_array + 4);

  for (let relPos of rotacion_idPieza) {

    colX = x + relPos[0];
    colY = y + relPos[1];
    const posMatriz = objeto.matrizFondo[colY][colX];

    posMatriz.valor = 9; // distinto de 0 = RatroPieza
  }
}

// =============================================================================
function actualizar_matrizFondo(fila) {

  // Desplazar los 'ratrosPiezas' hacia abajo al hacer linea -------
  const filas = constantes.filas;
  const columnas = constantes.columnas;
  const matriz = objeto.matrizFondo;

  for (let i = fila; i > 0; i --) {
    for (let ii = 0; ii < columnas; ii ++) {

      matriz[i][ii].valor = matriz[i - 1][ii].valor;
    }
  }
}

// =============================================================================
function check_levelUp(lineas) {

  //console.log(lineas);

  for (let i of varias.bandera_levelUp) {

    const bandera = i[0];
    const lineasLevelUp = i[1];

    if (lineas >= lineasLevelUp && lineas < lineasLevelUp + 4 && !bandera) {

      i[0] = true;
      estado.enJuego = false;
      estado.entreNiveles = true;
      console.log(estado.enJuego, estado.entreNiveles);

      if (!sonido.musicaFondo.paused) sonido.musicaFondo.pause();
      sonido.levelUp.play();

      const tx = Math.floor(ed.canvas.width / 2);
      const ty = Math.floor(ed.canvas.height / 3);
      objeto.textos = new Textos(tx, ty, 'Nivel SUPERADO!', 20, 'center', 'orangered', 'entreNiveles');
      objeto.scores.nivel ++;

      Pieza.incr_dificultad_caePieza();

      setTimeout(() => {
        estado.enJuego = true;
        estado.entreNiveles = false;

        if (sonido.musicaFondo.paused) sonido.musicaFondo.play()

      }, 5000);
    }
  }
}

// =============================================================================
function ir_al_gameOver() {

  estado.game_over = true;
  estado.enJuego = false;
  sonido.gameOverVoz.play();

  const tx = Math.floor(ed.canvas.width / 2);
  const ty = Math.floor(ed.canvas.height / 2);
  objeto.textos = new Textos(tx, ty, 'Game Over', 35, 'center', 'yellowgreen', 'game_over');

  setTimeout(() => {
    estado.game_over = false;
    estado.rejugar = true;
    sonido.musicaFondo.pause();

    const tx = Math.floor(ed.canvas.width / 2);
    let ty = Math.floor(ed.canvas.height / 2);
    objeto.textos = new Textos(tx, ty, 'Game Over', 35, 'center', 'yellowgreen', 'rejugar');

    ty = Math.floor(ed.canvas.height / 1.1);
    objeto.textos2 = new Textos(tx, ty, 'Toque o haga click para continuar...', 15, 'center', 'white', 'rejugar');
  }, 5500);
}

// =============================================================================
function resetear_rejugar() {

  if (objeto.scores.lineas > objeto.scores.record) objeto.scores.record = objeto.scores.lineas;

  objeto.scores.lineas = 0;
  objeto.scores.nivel = 1;

  Pieza.incr_dificultad_caePieza();

  varias.bandera = false;

  for (let bandera of varias.bandera_levelUp) {
    bandera[0] = false;
  }

  const filas = constantes.filas;
  const columnas = constantes.columnas;
  for (let i = 0; i < filas; i ++) {
    for (let ii = 0; ii < columnas; ii ++) {
      const fondo = objeto.matrizFondo[i][ii];
      fondo.valor = 0;
    }
  }

  const tx = Math.floor(ed.canvas.width / 2);
  const ty = Math.floor(ed.canvas.height / 2);
  objeto.textos2 = new Textos(tx, ty, 'Toque o haga click para comenzar...', 15, 'center', 'lightblue', 'menu_principal');
}

// =============================================================================
function borraCanvas() {

  ed.ctx.fillStyle = colores.fondo_canvas;
  ed.ctx.fillRect(0, 0, ed.canvas.width, ed.canvas.height);
}

// =============================================================================
async function fetching_records() {

  const endpoint = constantes.endPoint;

  try {
    const response = await fetch(endpoint);
    console.log(response);

    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      // Ordenar los records...
      const tabla = jsonResponse.jugadores.sort((a, b) => a.nroManos > b.nroManos ? 1 : -1);
      console.log(tabla);

      constantes.listaRecords = jsonResponse;

      //funcion para mostrar la informacion de la lista de records
      mostrar_records(constantes.listaRecords);
      //mostrar_records(jsonResponse);
    }

  } catch (error) {
    console.log(error);
  }
}

// =============================================================================
function mostrar_records(jsonResponse) {

  console.log(jsonResponse);

  for (let i = 0; i < jsonResponse.jugadores.length; i ++) {

    const indice = i + 1;
    const nombre = jsonResponse.jugadores[i]['nombre'];
    const ganadas = jsonResponse.jugadores[i]['ganadas'];
    const nroManos = jsonResponse.jugadores[i]['nroManos'];

    creaElementoDom(indice.toString() + '.', 'center');
    creaElementoDom(nombre.toString(), 'left');
    creaElementoDom(ganadas.toString(), 'right');
    creaElementoDom(nroManos.toString(), 'right');
  }
}

// =============================================================================
function creaElementoDom(txt, justificar) {

  const elemento = document.createElement('p');
  elemento.style.justifySelf = justificar;
  elemento.innerHTML = txt;
  objeto.contenedorRecords[0].appendChild(elemento);
}

// =============================================================================
function borrarTodosChild(contenedorPadre) {

  while (contenedorPadre.firstChild) {
    contenedorPadre.removeChild(contenedorPadre.firstChild);
  }
}

// =============================================================================
function borrarLastChild(contenedorPadre) {

  contenedorPadre.removeChild(contenedorPadre.lastChild);
}

// =============================================================================
function check_entrarEnMejores10() {

  const endpoint = constantes.endPoint;

  const agregaScore = {
    nombre: "Jugador",
    ganadas: 1,
    nroManos: marcadores.contadorManos
  }

  constantes.listaRecords.jugadores.push(agregaScore);
  console.log(constantes.listaRecords);

  const tabla = constantes.listaRecords.jugadores.sort((a, b) => a.nroManos > b.nroManos ? 1 : -1);
  console.log(tabla);

  constantes.listaRecords.jugadores.pop();
  console.log(constantes.listaRecords);

  const todos_menosBotonVolver = 36;

  for (let i = 0; i < todos_menosBotonVolver; i ++) {
    borrarLastChild(objeto.contenedorRecords[0]);
  }

  mostrar_records(constantes.listaRecords);

}

export {
  borraCanvas,
  instanciar_matrizFondo,
  instanciar_pieza,
  draw_canvas,
  check_colisiones,
  dejar_rastro_pieza,
  actualizar_matrizFondo,
  check_levelUp,
  ir_al_gameOver,
  resetear_rejugar
};
