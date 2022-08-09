//Carrusel Version 2.0
//Instrucciones:
//Se debe llamar al constructor dentro del index.js aplicandoselo a una nueva variable x cada instancia requerida:
//EJ:
// const carrusel1 = new Carrousel(ACA VAN LAS OPCIONES)
//Cada nueva instancia, requiere parametros de construccion, en el orden correcto con sus opciones.
//El primer valor, indica en que slide debe comenzar. El 2ndo, el contenedor del carrusel, que debe tener la 
//siguiente estructura interna en html:
//<div>
//  <div class="sliderContainer primerInstancia">
//      <div class="slide">Un Slide</div>
//      <div class="slide">Dos Slides</div>
//      <div class="slide">Tres Slides lalala</div>
//  </div>
//</div>
//<div class="dotContainer primerInstancia">
//</div>
//
//Siendo en ese caso la clase '.primerInstancia' la que debe ir en la opcion de construccion.
//La tercer opcion es un booleano, para definir si se desplaza automaticamente.
//La 4ta opcion, estipula el tiempo entre slides cuando es automatico en milisegundos.
//La 5ta opcion, define si los dots estaran visibles. (por default se ocultan con 1 elemento)
//La 6ta opcion, define si las flechas son visibles. (por default se ocultan con 1 elemento)
//La cantidad de Slides dependera de la necesidad.
//
//
// 
//Luego, debe invocarse el metodo de construccion .setupSlides()
//
//
//


//Constructor

export class Carousel {
    constructor(index = 1, container, autoSlide, autoSlideTime, dotsEnabled, showArrows){
        this.slideIndex = index;
        this.container = container;
        this.dotContainer = document.querySelector(".dotContainer" + container);
        this.slides = document.querySelectorAll(container + " .slide");

        //options
        this.autoSlide = autoSlide;
        this.autoSlideTime = autoSlideTime
        this.dotsEnabled = dotsEnabled;
        this.showArrows = showArrows;
    }

    //Comandos de movimiento de slides.
    plusSlides(n){
        this.showSlides(this.slideIndex += n);
    }
    currenteSlide(n){
        this.showSlides(this.slideIndex = n);
    }
    //Metodo para el display de cada slide individualmente.
    showSlides(n){
        this.dots = document.querySelectorAll(this.container + " .dot");
        let i;

        if(n > this.slides.length){
            this.slideIndex = 1;
        }
        if(n < 1){
            this.slideIndex = this.slides.length;
        }
        for (i = 0; i < this.slides.length; i++){
            this.slides[i].style.display = "none";
        }
        for (i = 0; i < this.dots.length; i++){
            this.dots[i].className = this.dots[i].className.replace(" activeDot", "");
        }
        this.slides[this.slideIndex - 1].style.display = "block";
        //Si los dots estan activados, muestra en tiempo real la ubicacion del dot.
        if(this.dotsEnabled === true){
            this.dots[this.slideIndex - 1].className += " activeDot";
        }
    }

    //Metodo a llamar para crear la instancia del carrusel. (asigna los movimientos a las flechas y dots)
    //asi como tambien triggerea la opcion de el slide automatico.
    setupSlides(){
        //Construccion de flechas de desplazamiento. Si la cantidad de items es 1, no se hacen flechas.
        //TODO Revisar en breakpoints!
        if(this.slides.length > 1 && this.showArrows === true){
            let arrowContainer = document.querySelector(this.container)
            let prevButton = document.createElement('button');
            prevButton.classList.add("prev");
            prevButton.innerHTML = '&#10094;'
            arrowContainer.appendChild(prevButton);
            document.querySelector(this.container + " .prev").addEventListener("click", e => this.plusSlides(-1));

            let nextButton = document.createElement('button');
            nextButton.classList.add("next");
            nextButton.innerHTML = '&#10095;'
            arrowContainer.appendChild(nextButton);
            document.querySelector(this.container + " .next").addEventListener("click", e => this.plusSlides(1));
        }


        //Si los dots estan desactivados, no se construyen.
        if(this.dotsEnabled === true){
            //Si la cantidad de slides es 1, los dots se ocultan por default.
            if(this.slides.length == 1){
                this.dotsEnabled = false;
            }else{
                //Si son mas, se crean dots correspondientes para cada item y su eventlistener correspondiente
                for (let i = 0; i < this.slides.length; i++){
                    let dots = document.createElement('span');
                    dots.classList.add("dot");
                    this.dotContainer.appendChild(dots);
                    dots.addEventListener("click", e => this.currenteSlide(i + 1));
                }
            }
        }

        this.showSlides(this.slideIndex);

        //Slide Automatico
        if(this.autoSlide === true){
            setInterval(() => {
                this.plusSlides(1);
            }, this.autoSlideTime);
        }
    }
}