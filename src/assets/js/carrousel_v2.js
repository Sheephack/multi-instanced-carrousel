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
//      <div class="slide">Tres Slides etc...</div>
//  </div>
//</div>
//<div class="dotContainer primerInstancia">
//</div>
//
//Siendo en ese caso la clase '.primerInstancia' la que debe ir en la opcion de construccion.
//La tercer opcion indica tiempo en ms de desplazamiento automatico de slides. Si es 0, el carrusel no se desplaza automaticamente.
//La 3ra opcion, define si los dots estaran visibles. (por default se ocultan con 1 elemento)
//La 4ta opcion, define si las flechas son visibles. (por default se ocultan con 1 elemento)
//La 5ta opcion, define si se van a mostrar multiples elementos por slide.
//La cantidad de Slides dependera de la necesidad.
//
//
// 
//Luego, debe invocarse el metodo de construccion .setupSlides()
//
//
//

//TODO: Verificar movimiento hacia atras en el ultimo elemento en desktop y mobile.
//TODO: Metodo de seleccion de cantidad de items por breakpoints?

//Constructor

export function CarouselInit() { // la funcion CarouselInit debe ser importada al index.js e invocada previo a la declaracion de instancias.
    if (typeof window.Carousel === 'undefined'){
        window.Carousel = class{
            constructor(index = 1, container, autoSlide, dotsEnabled, showArrows, multipleItems){
                this.slideIndex = index;
                this.container = container;
                this.dotContainer = document.querySelector(".dotContainer" + container);
                this.slides = document.querySelectorAll(container + " .slide");
        
                //options
                this.autoSlide = autoSlide;
                this.dotsEnabled = dotsEnabled;
                this.showArrows = showArrows;
                this.multipleItems = multipleItems;
        
                //global
                this.actualQuerie;
            }
            //Comandos de movimiento de slides.
            plusSlides(n){
                this.showSlides(this.slideIndex += n);
            }
            currenteSlide(n){
                this.showSlides(this.slideIndex = n);
            }
            //Los 3 siguientes metodos, hacen el cambio de cantidad de items y de desplazamiento en diferentes breakpoints
            handleTabletChange(e){
                if(e.matches){
                    this.actualQuerie = 'tablet';
                    for (let i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                    this.slides[this.slideIndex].style.display = "block";
        
                    if(this.dotsEnabled === true){
                        if(this.multipleItems === true){
                            let removeDots = this.dotContainer.querySelectorAll('.activeDot')
                            removeDots.forEach(element => {
                                element.classList.remove('activeDot')
                            });
                            this.dots[this.slideIndex - 1].className += " activeDot";
                            this.dots[this.slideIndex].className += " activeDot";
                        }else{
                            this.dots[this.slideIndex - 1].className += " activeDot";
                        }
                    }
                }
            }
            handleDesktopChange(e){
                if(e.matches){
                    this.actualQuerie = 'desktop';
                    for (let i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                    this.slides[this.slideIndex].style.display = "block";
                    this.slides[this.slideIndex + 1].style.display = "block";
                    
                    if(this.dotsEnabled === true){
                        if(this.multipleItems === true){
                            let removeDots = this.dotContainer.querySelectorAll('.activeDot')
                            removeDots.forEach(element => {
                                element.classList.remove('activeDot')
                            });
                            this.dots[this.slideIndex - 1].className += " activeDot";
                            this.dots[this.slideIndex].className += " activeDot";
                            this.dots[this.slideIndex + 1].className += " activeDot";
                        }else{
                            this.dots[this.slideIndex - 1].className += " activeDot";
                        }
                    }
                }
            }
            handleMobileChange(e){
                if(e.matches){
                    this.actualQuerie = 'mobile';
                    for (let i = 0; i < this.slides.length; i++){
                        this.slides[i].style.display = "none";
                    }
                    this.slides[this.slideIndex - 1].style.display = "block";
                    if(this.dotsEnabled === true){
                        if(this.multipleItems === true){
                            let removeDots = this.dotContainer.querySelectorAll('.activeDot')
                            removeDots.forEach(element => {
                                element.classList.remove('activeDot')
                            });
                            this.dots[this.slideIndex - 1].className += " activeDot";
                        }else{
                            this.dots[this.slideIndex - 1].className += " activeDot";
                        }
                    }
                }
            }
            //TODO Revisar en breakpoints!
            //Metodo para el display de cada slide individualmente.
            showSlides(n){
                this.dots = document.querySelectorAll(this.container + " .dot");
                let i;
                if(this.multipleItems === true){
                    if(this.actualQuerie === 'mobile'){
                        if(n > this.slides.length){
                            this.slideIndex = 1;
                        }
                    }else if (this.actualQuerie === 'tablet'){
                        if(n > this.slides.length -1){
                            this.slideIndex = 1;
                        }
                    }else if (this.actualQuerie === 'desktop'){
                        if(n > this.slides.length -2){
                            this.slideIndex = 1;
                        }
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
                    
                //En esta seccion, se observa el cambio de breakpoints cuando la opcion de items multiples esta activa.
                if(this.multipleItems === true){
                    const mqTablet = window.matchMedia('(min-width:768px) and (max-width:1199px)');
                    const mqDesktop = window.matchMedia('(min-width:1200px)');
                    const mqMobile = window.matchMedia('(max-width:767px')
                    
                    mqMobile.addEventListener('change', this.handleMobileChange.bind(this))
                    mqTablet.addEventListener('change', this.handleTabletChange.bind(this))
                    mqDesktop.addEventListener('change', this.handleDesktopChange.bind(this))
                    //Checks iniciales:
                    this.handleMobileChange(mqMobile)
                    this.handleTabletChange(mqTablet)
                    this.handleDesktopChange(mqDesktop)
                }else{
                    this.slides[this.slideIndex - 1].style.display = "block";
                }
                
                //Si los dots estan activados, y el muestro de items multiples desactivado, muestra en tiempo real la ubicacion del unico dot.
                if(this.dotsEnabled === true && this.multipleItems === false){
                        this.dots[this.slideIndex - 1].className += " activeDot";
                }
            }
        
            //Metodo a llamar para crear la instancia del carrusel. (asigna los movimientos a las flechas y dots)
            //asi como tambien triggerea la opcion de el slide automatico.
            setupSlides(){
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
                //Slide Automatico, requiere un valor en milisegundos dado en la opcion del carrusel. Valor 0, implica no Slide automatico.
                if(this.autoSlide !== 0){
                    setInterval(() => {
                        this.plusSlides(1);
                    }, this.autoSlide);
                }
            }
    
        }
    }else if (typeof window.Carousel === 'function'){
        console.log("Clase definida previamente satisfactoriamente")
    }
}