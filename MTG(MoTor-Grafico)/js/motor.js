var loop = {
    idEjecution: null,
    ultimoRegistro: 0,
    aps: 0,
    fps: 0,
    iterar: function(registrotemporal){
        //Esto crea un bucle infinito que se va repite cada 60fps exactos.
        loop.idEjecution = window.requestAnimationFrame(loop.iterar);
        loop.update(registrotemporal);
        loop.play();
        //Reinicia los fps cada segundo.
        if(registrotemporal - loop.ultimoRegistro > 999){
            loop.ultimoRegistro = registrotemporal;
            console.log(loop.fps);
            loop.aps = 0;
            loop.fps = 0;
        }
    },

    update:()=>{
        //Cuenta los aps.
        loop.aps++;
    },
    
    play:() =>{
        //Cuenta los fps.
        loop.fps++;
        borrarCnavas();

        //Comienza un nuevo path de impresion.
        ctx.beginPath();
        ctx.font = "12px verdana";
        ctx.fillStyle = "yellow";
        //Imprime la hora y fecha y lo situa en las cordenadas
        ctx.fillText(Timer.now, 15, 20);
        //Cerramos el Path
        ctx.stroke();
    }
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Asigna un margen de 10.
var margen = 10;
//Posiciona arriba.
var canvasTop = (margen/2);
//Posiciona a la derecha.
var canvasLeft = (margen/2);
//Contiene solo lo que tiene la parte visible.
//5-10.
var canvasWidth = window.innerWidth-margen;
var canvasHeight = window.innerHeight-margen;

function borrarCnavas(){
    //Limpia el canvas.
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function ResizeWindows(){
    //Cuando se redimensiona la ventana el canvas se redimensiona.
    canvas.style.top = canvasTop + "px";
    canvas.style.left = canvasLeft+"px";
    canvas.style.width = canvasWidth+"px";
    canvas.style.height = canvasHeight+"px";
};

Concurrent.Thread.create(initTimer);    

window.addEventListener("load", function(e){
    //Cuando se termine de cargar todo redimenciona y pone en marcha el motor gráfico.
    ResizeWindows();
    loop.iterar();
  
});

window.addEventListener("resize", function(e){
    //Crea un evento a la lista del navegador que redimensione el canvas.
    ResizeWindows();
  
});