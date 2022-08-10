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
    constructor(index = 1, container, autoSlide, autoSlideTime, dotsEnabled, showArrows, resizing, multipleItems){
        this.slideIndex = index;
        this.container = container;
        this.dotContainer = document.querySelector(".dotContainer" + container);
        this.slides = document.querySelectorAll(container + " .slide");

        //options
        this.autoSlide = autoSlide;
        this.autoSlideTime = autoSlideTime
        this.dotsEnabled = dotsEnabled;
        this.showArrows = showArrows;
        this.isResizing = resizing;
        this.multipleItems = multipleItems;
    }
    // setWindowResizeEvent(){
    //     //acomodo el evento para detectar resize y que se vuelva a construir el carousel
    //     window.addEventListener('resize', event => {
    //         //este se hace para que no se haga resize en cada pixel, sino que espera 1000 antes de hacerlo
    //         if(this.isResizing) {
    //             return;
    //         } else {
    //             this.isResizing=true;
    //             setTimeout(()=>{
    //                 //chequea si se destruye o no porque si no cambia el layout no vale la pena
    //                 let newLayout = this.setLayout(window.innerWidth)
    
    //                 //si setLayout devuelve false, es necesario la destruccion porque no hay carousel en este nuevo layout y no se activa mas
    //                 if ( !newLayout ) {
    //                     console.log('esta desactivo')
    //                     this.destroyCarousel();
    //                 } else if ( newLayout != layout ) {
    //                     //si newLayout no es igual a llayout hay que destruirlo y volverlo a armar porque cambia layout
    //                     this.isResizing=false;
    //                     this.destroyCarousel();
    //                     setTimeout(()=>{
    //                         this.startCarousel();
    //                     },500);
    //                 } 
    
    //                 this.isResizing=false;
                    
    //             },1000)
    //         }
    //     });
    // }
    // //devuelve layout: base/medium/large/xl y sabe cuantos debe mostrar
    // setLayout(w){
    //     let breakpoints = {
    //         base: {
    //             minWidth: 0,
    //             items: 1,
    //             active: true
    //         },
    //         medium: {
    //             minWidth: 760,
    //             items: 2,
    //             active: true
    //         },
    //         large: {
    //             minWidth: 992,
    //             items: 3,
    //             active: true
    //         },
    //         xlarge: {
    //             minWidth: 1200,
    //             items: 3,
    //             active: true
    //         }
    //     }
    //     let items = 1;
    //     let active = true;
    
    //     switch (true) {
    //         case w > breakpoints.xlarge.minWidth:
    //             items = breakpoints.xlarge.items;
    //             active = breakpoints.xlarge.active;
    //         break;
        
    //         case w > breakpoints.large.minWidth:
    //             items = breakpoints.large.items;
    //             active = breakpoints.large.active;
    //         break;
    
    //         case w > breakpoints.medium.minWidth:
    //             items = breakpoints.medium.items;
    //             active = breakpoints.medium.active;
    //         break;
    //         default:
    //             items = breakpoints.base.items;
    //             active = breakpoints.base.active;
    //         break;
    //     }
    
    //     if ( active ) {
    //         return items;
    //     } else {
    //         return false;
    //     }
        
    // }
    //Comandos de movimiento de slides.
    plusSlides(n){
        this.showSlides(this.slideIndex += n);
    }
    currenteSlide(n){
        this.showSlides(this.slideIndex = n);
    }
    //TODO Revisar en breakpoints!
    //Metodo para el display de cada slide individualmente.
    showSlides(n){
        this.dots = document.querySelectorAll(this.container + " .dot");
        let i;
        if(this.multipleItems === true){
            if(n > this.slides.length -1){
                this.slideIndex = 1;
            }
        }else{
            if(n > this.slides.length){
                this.slideIndex = 1;
            }
        }
        if(this.multipleItems === true){
            if(n < 1){
                this.slideIndex = this.slides.length -1;
            }
        }else{
            if(n < 1){
                this.slideIndex = this.slides.length;
            }
        }
        for (i = 0; i < this.slides.length; i++){
            this.slides[i].style.display = "none";
        }
        for (i = 0; i < this.dots.length; i++){
            this.dots[i].className = this.dots[i].className.replace(" activeDot", "");
        }
        //Preparacion de media queries
        if(this.multipleItems === true){
            const mqTablet = window.matchMedia('(min-width:768px');
            const mqDesktop = window.matchMedia('(min-width:1200px)');
        }
        
            
        //TODO > ATENCION: MODIFICADOR DE BEHAVIOR Debajo de esta linea.
        if(this.multipleItems === true){
            const mqTablet = window.matchMedia('(min-width:768px) and (max-width:1000px)');
            const mqDesktop = window.matchMedia('(min-width:1200px)');
            const mqMobile = window.matchMedia('(max-width:767px')
            function handleTabletChange(e){
                if(e.matches){
                    for (i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                    this.slides[this.slideIndex].style.display = "block";
                }
            }
            function handleDesktopChange(e){
                if(e.matches){
                    for (i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                    this.slides[this.slideIndex].style.display = "block";
                    this.slides[this.slideIndex + 1].style.display = "block";
                }
            }
            function handleMobileChange(e){
                if(e.matches){
                    for (i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                }
            }
            mqMobile.addListener(handleMobileChange.bind(this))
            mqTablet.addListener(handleTabletChange.bind(this))
            mqDesktop.addListener(handleDesktopChange.bind(this))
            //Checks iniciales:
            handleMobileChange(mqMobile).bind(this)
            handleTabletChange(mqTablet).bind(this)
            handleDesktopChange(mqDesktop).bind(this)
        }else{
            this.slides[this.slideIndex - 1].style.display = "block";
        }
        
        
        //Si los dots estan activados, muestra en tiempo real la ubicacion del dot.
        if(this.dotsEnabled === true){
            //TODO > ATENCION: MODIFICADOR DE BEHAVIOR DEBAJO DE ESTA LINEA
            if(this.multipleItems === true){
                this.dots[this.slideIndex - 1].className += " activeDot";
                this.dots[this.slideIndex].className += " activeDot";
            }else{
                this.dots[this.slideIndex - 1].className += " activeDot";
            }
        }
    }

    //Metodo a llamar para crear la instancia del carrusel. (asigna los movimientos a las flechas y dots)
    //asi como tambien triggerea la opcion de el slide automatico.
    setupSlides(){
        // this.setWindowResizeEvent();
        //Construccion de flechas de desplazamiento. Si la cantidad de items es 1, no se hacen flechas.
        if(this.slides.length > 1 && this.showArrows === true){
            let arrowContainer = document.querySelector(this.container)
            let prevButton = document.createElement('button');
            prevButton.classList.add("prev");
            prevButton.innerHTML = '&#10094;'
            arrowContainer.appendChild(prevButton);
            if(this.multipleItems === true){
                document.querySelector(this.container + " .prev").addEventListener("click", e => this.plusSlides(-1));
            }else{
                document.querySelector(this.container + " .prev").addEventListener("click", e => this.plusSlides(-1));
            }

            let nextButton = document.createElement('button');
            nextButton.classList.add("next");
            nextButton.innerHTML = '&#10095;'
            arrowContainer.appendChild(nextButton);
            if(this.multipleItems === true){
                document.querySelector(this.container + " .next").addEventListener("click", e => this.plusSlides(1));
            }else{
                document.querySelector(this.container + " .next").addEventListener("click", e => this.plusSlides(1));
            }
        }


        //Si los dots estan desactivados, no se construyen.
        if(this.dotsEnabled === true){
            //Si la cantidad de slides es 1, los dots se ocultan por default.
            if(this.slides.length == 1){
                this.dotsEnabled = false;
            }else{
                //Si son mas, se crean dots correspondientes para cada item y su eventlistener correspondiente
                if(this.multipleItems === true){
                    for (let i = 0; i < this.slides.length; i++){
                        let dots = document.createElement('span');
                        dots.classList.add("dot");
                        this.dotContainer.appendChild(dots);
                        dots.addEventListener("click", e => this.currenteSlide(i + 1));
                    }
                }else{
                    for (let i = 0; i < this.slides.length; i++){
                        let dots = document.createElement('span');
                        dots.classList.add("dot");
                        this.dotContainer.appendChild(dots);
                        dots.addEventListener("click", e => this.currenteSlide(i + 1));
                    }
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