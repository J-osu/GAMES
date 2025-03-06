//--------------------------------------------------
//        TETRIS
//--------------------------------------------------
import {
  constantes,
  elementosDom,
  objeto,
  controles,
  estado,
  varias,
  marcadores,
  sonido
} from "./constants.js";

import {
  instanciar_matrizFondo,
  instanciar_pieza,
  check_levelUp,
  resetear_rejugar
} from "./funtions.js";

import { MatrizFondo } from "./matriz.js";
import { Marcadores } from "./marcadores.js";
import { Textos } from "./texto.js";

let eventoSel;
// ---------------------------------------------------------------------
//  Eventos Raton, Touch, Key
//
// ---------------------------------------------------------------------
for (let tipoEvento of constantes.eventos) {

  document.addEventListener(tipoEvento, (ev) => {

    if (estado.menu_principal && tipoEvento === eventoSel) {

      if (ev.target.id === 'canvas') {

        estado.menu_principal = false;
        estado.enJuego = true;

        if (sonido.musicaFondo.paused) {
          sonido.musicaFondo.play()
          sonido.musicaFondo.volume = 0.6;
        } else {
          sonido.musicaFondo.pause()
        }
      }
    }

    if (estado.rejugar && tipoEvento === eventoSel) {

      if (ev.target.id === 'canvas') {
        estado.menu_principal = true;
        estado.rejugar = false;
        sonido.click.play();

        resetear_rejugar();
      }
    }

    if (tipoEvento === eventoSel && (ev.target.id === 'boton__menu' || ev.target.id === 'boton__noDir__menu')) {

      if (sonido.musicaFondo.paused) {
        sonido.musicaFondo.play()
      } else {
        sonido.musicaFondo.pause()
      }
    }

    if (tipoEvento === 'keydown' && (ev.key === 's' || ev.key === 'S')) {

      if (sonido.musicaFondo.paused) {
        sonido.musicaFondo.play()
      } else {
        sonido.musicaFondo.pause()
      }
    }

    if ((estado.enJuego && tipoEvento === eventoSel) || (estado.enJuego && tipoEvento === 'keydown')) {
      console.log(ev.key, ev.keyCode);
      console.log(sonido.musicaFondo.paused);

      if (ev.key === 'ArrowLeft' || ev.keyCode === 37) {
        controles.teclaIzquierda = true;

      } else if (ev.key === 'ArrowRight' || ev.keyCode === 39) {
        controles.teclaDerecha = true;

      } else if (ev.key === 'ArrowDown' || ev.keyCode === 40) {
        controles.teclaAbajo = true;

      } else if (ev.key === 'Control' || ev.keyCode === 17 || ev.keyCode === 32) {
        controles.teclaRotar = true;
      }
    }

    if (estado.enJuego && tipoEvento === eventoSel) {
      console.log(ev.target.id);

      if (ev.target.id === 'boton__le' || ev.target.id === 'flecha__le') {
        controles.teclaIzquierda = true;

      } else if (ev.target.id === 'boton__ri' || ev.target.id === 'flecha__ri') {
        controles.teclaDerecha = true;

      } else if (ev.target.id === 'boton__do' || ev.target.id === 'flecha__do') {
        controles.teclaAbajo = true;

      } else if (ev.target.id === 'boton__rotar' || ev.target.id === 'boton__noDir__rotar') {
        controles.teclaRotar = true;
      }
    }
  });
}

// ---------------------------------------------------------------------
//  Funcion INICIALIZADORA
//
// ---------------------------------------------------------------------
window.onload = () => {

  //fetching_records();

  eventoSel = constantes.eventos[1];
  console.log(eventoSel);

  elementosDom.ctx = elementosDom.canvas.getContext('2d');
  // let ctx = elementosDom.ctx;

  elementosDom.canvas.width = constantes.columnas * constantes.tileX;
  elementosDom.canvas.height = constantes.filas * constantes.tileY;

  elementosDom.canvas.style.border = '1px solid black';

  // elementosDom.canvas.style.width = '40vw';
  // elementosDom.canvas.style.height = '100vh';

  //elementosDom.icono_rotar.style.backgroundImage = "url('./img/icono_rotar.png')";

  // -------------------------------------------------------
  objeto.matrizFondo = instanciar_matrizFondo();

  const tx = Math.floor(elementosDom.canvas.width / 2);
  const ty = Math.floor(elementosDom.canvas.height / 2);
  objeto.textos = new Textos(tx, ty, 'Toque o haga click para comenzar...', 15, 'center', 'lightblue', 'menu_principal');
  objeto.scores = new Marcadores(marcadores.lineas, marcadores.nivel, marcadores.record);

  objeto.pieza = instanciar_pieza();

  // -------------------------------------------------------
  const fps = constantes.fps;
  setInterval(() => {
    bucle_principal();
  }, 1000 / fps);

  // -------------------------------------------------------
  varias.cae_pieza = setInterval(() => {
    if (constantes.gravedad) controles.teclaAbajo = true;
  }, varias.dificultad_caer[1]);
}

// ---------------------------------------------------------------------
//  Bucle PRINCIPAL
//
// ---------------------------------------------------------------------
function bucle_principal() {

  // Renderiza el fondo (vacio o piezas acumulandose)...
  const filas = constantes.filas;
  const columnas = constantes.columnas;
  for (let i = 0; i < filas; i ++) {
    for (let ii = 0; ii < columnas; ii ++) {
      const fondo = objeto.matrizFondo[i][ii];
      fondo.dibuja();
    }
  }

  // Renderiza las piezas -----------------------------------
  if (objeto.pieza[0]) objeto.pieza[0].dibuja_pieza();
  if (objeto.pieza[1]) objeto.pieza[1].dibuja();

  // Instanciar Nueva Pieza ---------------------------------
  if (varias.otra_pieza) objeto.pieza = instanciar_pieza();

  // Check si hemos 'hecho linea' ---------------------------
  MatrizFondo.check_lineDone();

  // Render Scores ------------------------------------------
  objeto.scores.mostrar_marcadores();

  // Render Textos ------------------------------------------
  objeto.textos.mostrar_txt();
  if (objeto.textos2) objeto.textos2.mostrar_txt();

  // Check levelUp ------------------------------------------
  check_levelUp(objeto.scores.lineas);
}
