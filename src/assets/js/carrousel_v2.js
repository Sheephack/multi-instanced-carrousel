//Carrusel Version 2.0
//Instrucciones:
//Se debe llamar al constructor dentro del index.js aplicandoselo a una nueva variable x cada instancia requerida.
//Cada nueva instancia, requiere parametros de construccion, en el orden correcto.
//El primer valor, indica en que slide debe comenzar. El 2ndo, el contenedor del carrusel, que debe tener la 
//siguiente estructura interna en html:
//<div>
//  <div class="sliderContainer primerInstancia">
//      <div class="slide">Un Slide</div>
//      <div class="slide">Dos Slides</div>
//      <div class="slide">Tres Slides lalala</div>
//      <a class="prev">&#10094;</a>
//      <a class="next">&#10095;</a>
//  </div>
//</div>
//<div class="dotContainer primerInstancia">
//  <span class="dot"></span>
//  <span class="dot"></span>
//  <span class="dot"></span>
//</div>
//
//La cantidad de Slides dependera de la necesidad al igual que la cantidad de dots.
//
//
// 
//Luego, debe invocarse el metodo de construccion .setupSlides()
//
//
//


//Constructor

export class Carousel {
    constructor(index = 1, container, autoSlide){
        this.slideIndex = index;
        this.container = container;
        this.slides = document.querySelectorAll(container + " .slide");
        this.dots = document.querySelectorAll(container + " .dot");
        //options
        this.autoSlide = autoSlide
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
        this.dots[this.slideIndex - 1].className += " activeDot";
    }

    //Metodo a llamar para crear la instancia del carrusel. (asigna los movimientos a las flechas y dots)
    //asi como tambien triggerea la opcion de el slide automatico.
    setupSlides(){
        document.querySelector(this.container + " .prev").addEventListener("click", e => this.plusSlides(-1));

        document.querySelector(this.container + " .next").addEventListener("click", e => this.plusSlides(1));

        for (let i = 0; i < this.dots.length; i++){
            this.dots[i].addEventListener("click", e => this.currenteSlide(i + 1));
        }

        this.showSlides(this.slideIndex);

        //Slide Automatico
        if(this.autoSlide === true){
            setInterval(() => {
                this.plusSlides(1);
            }, 5000);
        }
    }
}