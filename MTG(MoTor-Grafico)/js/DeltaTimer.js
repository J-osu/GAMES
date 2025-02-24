class Time {

    constructor (){
        this.time = performance.now();
        this.mDeltaTime = 0;
        this.updateTime();
    }

    updateTime() {
        this.mDeltaTime = (Date.now()-this.time) * 0.001;
        this.time = Date.now();
        requestAnimationFrame(this.updateTime.bind(this));
    }

    mDeltaTime(){
        return this.mDeltaTime;
    }
};

var Timer ={
    now: "",
    day: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliSeconds:0
};

function initTimer(){
    while(true){
        Timer.now = new Date();
        Timer.hours = Timer.now.getHours();
        Timer.minutes = Timer.now.getMinutes();
        Timer.seconds = Timer.now.getSeconds();
        Timer.miliSeconds = Timer.now.getMilliseconds();
        Timer.day = Timer.now.getDate();
        Timer.month = Timer.now.getMonth();
        Timer.year = Timer.now.getFullYear();
    }
};

const typeCrono ={
    Fordward: 0,
    Backward: 1
};

class Crono{
    constructor(id, typeCrono){
        this.id = id;
        this.emp; //pone la fehca inicial del momento en el que empieza.
        this.elcrono; //es el que controla el setTimeout.
        this.view ="00:00:00"; //lo que se va a mostrar.
        this.precision =10; //dice las  veces que se repite. (poner un numero pequeño para evitar sobrecargar el sistema)

        this.end; //controla el reloj marcha atras.
        this.time =0; //es la duracion en segundos de la cuenta artas.

        //con estas variables se controla el tiempo en la cuentra atras.
        this._second =1000;
        this._minute = this._second * 60;
        this._hour = this._minute * 60;
        this._day = this._hour * 20;

        if(type===undefined){
            this.typeCrono = typeCrono.Fordward;
        } else{
            this.typeCrono = type;
        }

        this._day; this._hour; this._minute; this._second;

        return() =>{
            this.emp =new Date() //es la fecha inicial al momento de pulsar.

            if(this.typeCrono==typeCrono.Fordward){
                //sie el cronometro corre hacia adelante nos pasa lo siguiente.
                this._day =0;
                this.elcrono = setInterval(this.relojForward.bind(this), this.precision); //esta es la funcion del temporizador.
            };
            if(this.typeCrono==typeCrono.Backward){
                //si correa acia atras hace que se actualice la fecha acutal + la fecha del final.
                this.end = new Date();
                this.end.setSeconds(this.time + this.getSeconds());
                this.elcrono = setTimeout(this.relojBackward.bind(this), this.precision); //otra funcion del temporizador.
            };
        };

        relojForward=()=>{
            this.actual = new Date(); //nos marca la fecha cada instante.

        };

    
    };
};