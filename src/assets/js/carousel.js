/*
 * CAROUSEL BÁSICO
 * Mini instrucciones:
 * La función inicial a llamar es carousel(wrapper, options=null)
 * recibe el contenedor (en lo posible por id) mayor donde está toda la sección y options para sobreescribir las optiones por defecto
 * Opciones: breakpoints, dots, navs
 * el html con id productos, debe tener data-active="1" para que este activo
 * Internamente, es necesario esta estructura para q el script interprete correctamente:
 * <div class="productos_wrapper">
        <ul class="productos">
            <li class="item-slider">
*/





export class CarouselV3{
    constructor(externalContainer, autoHeight, autoWidth, dots, arrows, resizing){
        this.externalContainer = document.querySelector(externalContainer + '.productos_wrapper');
        this.productContainer = this.externalContainer.querySelector('.productos')
        this.productos = this.productContainer.querySelectorAll('.item-slider');
        this.viewportWidth = window.innerWidth;
        this.autoHeight = autoHeight;
        this.autoHeight = autoWidth;
        this.containerHeight;
        this.containerWidth;

        //options
        this.bulletsActive = dots;
        this.navActive = arrows;
        this.isResizing = resizing;
    }
    setWindowResizeEvent(){
        //acomodo el evento para detectar resize y que se vuelva a construir el carousel
        window.addEventListener('resize', event => {
            //este se hace para que no se haga resize en cada pixel, sino que espera 1000 antes de hacerlo
            if(this.isResizing) {
                return;
            } else {
                this.isResizing=true;
                setTimeout(()=>{
                    //chequea si se destruye o no porque si no cambia el layout no vale la pena
                    let newLayout = this.setLayout(window.innerWidth)
    
                    //si setLayout devuelve false, es necesario la destruccion porque no hay carousel en este nuevo layout y no se activa mas
                    if ( !newLayout ) {
                        console.log('esta desactivo')
                        this.destroyCarousel();
                    } else if ( newLayout != layout ) {
                        //si newLayout no es igual a llayout hay que destruirlo y volverlo a armar porque cambia layout
                        this.isResizing=false;
                        this.destroyCarousel();
                        setTimeout(()=>{
                            this.startCarousel();
                        },500);
                    } 
    
                    this.isResizing=false;
                    
                },1000)
            }
        });
    }

    startCarousel(){
        this.setWindowResizeEvent();
        console.log('carousel started');
        
    
        //setea layout: base/medium/large/xl y sabe cuantos debe mostrar y si debe mostrarlo o detenerlo en este viewport
        let layout = this.setLayout(this.viewportWidth);
        if ( !layout ) {
            console.log('carousel detenido en este viewport: ', this.viewportWidth)
            return;
        }
    
        //chequea si vale la pena el carousel de acuerdo al layout y cantidad de items
        if (layout >= this.productos.length) {
    
            console.log('no hay suficientes productos para un carousel')
            return;
        }
    
        //setea el alto y ancho del ul de productos para soportar absolute
        if ( this.autoHeight ) {
            this.containerHeight = this.getHeightDefault();
        }
        
        if ( this.autoWidth ) {
            this.containerWidth = this.getWidthDefault( layout );
        }
    
        //arma bullets
        if (this.bulletsActive) {
            this.createBullets();
            this.externalContainer.append()
        }
    
        //arma navs
        if (this.navActive) {
            this.createNavigation();
        }
    
        //setea productos. activa el primero y prepara las clases para el layout a mostrar
        this.prepareProductsToSlide(layout);
    
        this.isNavigationsBtnsInView(0, layout);
        
    }
    //devuelve layout: base/medium/large/xl y sabe cuantos debe mostrar
    setLayout(w){
        let breakpoints = {
            base: {
                minWidth: 0,
                items: 1,
                active: true
            },
            medium: {
                minWidth: 760,
                items: 2,
                active: true
            },
            large: {
                minWidth: 992,
                items: 3,
                active: true
            },
            xlarge: {
                minWidth: 1200,
                items: 3,
                active: true
            }
        }
        let items = 1;
        let active = true;
    
        switch (true) {
            case w > breakpoints.xlarge.minWidth:
                items = breakpoints.xlarge.items;
                active = breakpoints.xlarge.active;
            break;
        
            case w > breakpoints.large.minWidth:
                items = breakpoints.large.items;
                active = breakpoints.large.active;
            break;
    
            case w > breakpoints.medium.minWidth:
                items = breakpoints.medium.items;
                active = breakpoints.medium.active;
            break;
            default:
                items = breakpoints.base.items;
                active = breakpoints.base.active;
            break;
        }
    
        if ( active ) {
            return items;
        } else {
            return false;
        }
        
    }
    //busca altura adecuada de acuerdo al producto más alto
    getHeightDefault(){
        let h = 0;
        for (let i = 0; i < this.productos.length; i++) {
            let prH = this.productos[i].getBoundingClientRect().height
            if ( prH > h ) {
                h = prH;
            }
        }
        return h;
    }
    //busca el ancho considerando el layout
    getWidthDefault(layout){
    let wid = 286;
    for (let i = 0; i < this.productos.length; i++) {
        let prW = productos[i].getBoundingClientRect().width
        if ( prW > wid ) {
            wid = prW;
        }
    }
    return wid * layout;
    
    }
    //crear bullets
    createBullets(){
    let ul = document.createElement('ul');
    ul.classList.add('bullets-wrapper');
    for (let index = 0; index < this.productos.length; index++) {
        let li = document.createElement('li');
        if (index == 0) {
            li.classList.add('active');
        }
        ul.append(li);
    }
    this.externalContainer.append(ul);
    }
    moveOne(direction){
        console.log(0)
        //detectar que numero está activo
        let layout = this.setLayout(this.viewportWidth);
        let active = parseInt(this.getActive());
        
        //sumar o restar al active
        if (direction == 'right' && (active + layout) < this.productos.length) {
            active++;
            this.moveTo(active, layout);
        } else if (direction == 'left' && active != 0){
            active--;
            this.moveTo(active, layout);
        }
        this.isNavigationsBtnsInView(active);
    }
    //click en botones de navegacion
    clickNavigation(event){
        let direction = event.target.getAttribute('data-direction');
        
        //se puede mover hacia ahí?
        if (event.target.getAttribute('data-hidden') != true ){
            //entonces mueva:
            this.moveOne(direction);    
        }
    }
    createNavigation(){
        let div = document.createElement('div');
            div.classList.add('nav-wrapper');
    
        //botones:
        let btnL = document.createElement('button');
            btnL.classList.add('nav-left');
            btnL.setAttribute('data-direction', 'left');
        div.append(btnL);
    
        let btnR = document.createElement('button');
            btnR.classList.add('nav-right');
            btnR.setAttribute('data-direction', 'right');
        div.append(btnR);
    
        this.externalContainer.append(div);
    
        //crea events para botones
    
        btnL.addEventListener('click', this.clickNavigation.bind(this));
    
        btnR.addEventListener('click', this.clickNavigation.bind(this));
    }
    //funcion que encuentra activa
    getActive(){
        let productActive = this.productContainer.querySelector('.item-on.active');
        let index = productActive.getAttribute('data-index');
        return index;  
    }
    //se mueve a este index: 0, 1, 2
    moveTo(index, layout){

    //recorrer productos
    for (let p = 0; p < this.productos.length; p++) {
        const producto = this.productos[p];
        producto.classList.remove('active-1');
        producto.classList.remove('active');
        producto.classList.remove('active1');
        producto.classList.remove('active2');
        producto.classList.remove('active3');
        producto.classList.remove('active4');
        producto.classList.remove('active-out-right');
    }
    
    //definimos active
    if ( this.productos[index-1] ) {
        this.productos[index-1].classList.add('active-1');
    }
    if ( this.productos[index] ) {
        this.productos[index].classList.add('active');
    }
    if ( this.productos[index+1] ) {
        //debugger;
        if (layout > 1 ) {
            this.productos[index+1].classList.add('active1');
        } else {
            this.productos[index+1].classList.add('active-out-right');
        }
    } 
    if ( this.productos[index+2] ) {
        //debugger;
        if (layout > 2 ) {
            this.productos[index+2].classList.add('active2');
        } else {
            this.productos[index+2].classList.add('active-out-right');
        }
    } 
    if ( this.productos[index+3] ) {  
        //debugger;
        if (layout > 3 ) {
            this.productos[index+3].classList.add('active3');
        } else {
            this.productos[index+3].classList.add('active-out-right');
        }
    } 
    if ( this.productos[index+4] ) {  
        //debugger;
        if (layout > 4 ) {
            this.productos[index+4].classList.add('active4');
            } else {
            this.productos[index+4].classList.add('active-out-right');
            }
        } 
    }
    prepareProductsToSlide(layout){
        this.externalContainer.classList.add('carousel-on');
        this.productContainer.classList.add('productos-on');
    
        if ( this.autoHeight ) {
            this.productContainer.style.height = this.containerHeight + 'px';
        }
    
        if ( this.autoWidth ) {
            this.productContainer.style.width = this.containerWidth + 'px';
        }
        
        for (let p = 0; p < this.productos.length; p++) {
            const producto = this.productos[p];
            producto.classList.add('item-on');
            producto.classList.add('item-on-'+layout)
            producto.setAttribute('data-index', p);
    
            switch (p) {
                case 0:
                    producto.classList.add('active');
                break;
                case 1:
                    if (layout && layout > 1) {
                        producto.classList.add('active1');
                    } else {
                        producto.classList.add('active-out-right');
                    }
                break;
                case 2:
                    if (layout && layout > 2) {
                        producto.classList.add('active2');
                    } else {
                        producto.classList.add('active-out-right');
                    }
                break;
                case 3:
                    if (layout && layout > 3) {
                        producto.classList.add('active3');
                    } else {
                        producto.classList.add('active-out-right');
                    }
                break;
                case 4:
                    if (layout && layout > 4) {
                        producto.classList.add('active4');
                    } else {
                        producto.classList.add('active-out-right');
                    }
                break;
            }
    
        }
    }
    //chequea si es correcto mostrar los buttons right y left y los oculta o los muestra
    isNavigationsBtnsInView(active, layout){
    let btns = document.querySelectorAll('.nav-wrapper button');

    if (active != 0){
        //muestra left
        btns[0].style.opacity = 1;
        btns[0].style.pointerEvents = 'all';
        btns[0].removeAttribute('data-hidden');
    } else {
        //oculta left
        btns[0].style.opacity = 0;
        btns[0].style.pointerEvents = 'none';
        btns[0].setAttribute('data-hidden', 'true');
    }

    if (layout != false ) {
        if (active+layout == this.productos.length) {
            //oculta right
            btns[1].style.opacity = 0;
            btns[1].style.pointerEvents = 'none';
            btns[1].setAttribute('data-hidden', 'true');
        } else {
            //muestra right
            btns[1].style.opacity = 1;
            btns[1].style.pointerEvents = 'all';
            btns[1].removeAttribute('data-hidden');
        }
    }
    }
    //destruye carousel, elementos y eventos
    destroyCarousel = () => {
    console.log('carousel ended')
    
    if (this.navActive) {
        //destruye navs
        let elemento = this.externalContainer.querySelector('.nav-wrapper');
        if (elemento) {
            let padre = elemento.parentNode;
		    padre.removeChild(elemento);
        }
    }

    if (this.bulletsActive) {
        //destruye bullets
        let elemento = this.externalContainer.querySelector('.bullets-wrapper');
        if (elemento) {
            let padre = elemento.parentNode;
		    padre.removeChild(elemento);
        }        
    }

    //quita clases agregadas para restaurar el diseño original
    //setea productos. activa el primero y prepara las clases para el layout a mostrar
    this.externalContainer.classList.remove('carousel-on');
    this.productContainer.classList.remove('productos-on');
    if ( this.autoHeight ) {
        this.productContainer.style.height = 'auto';
    }

    if ( this.autoWidth ) {
        this.productContainer.style.width = 'auto';
    }
    
    for (let p = 0; p < this.productos.length; p++) {
        const producto = this.productos[p];
        producto.classList.remove('item-on');
        producto.classList.remove('item-on-'+layout);
        producto.classList.remove('active-1');
        producto.classList.remove('active');
        producto.classList.remove('active1');
        producto.classList.remove('active2');
        producto.classList.remove('active3');
        producto.classList.remove('active4');
        producto.classList.remove('active-out-right');
    }
    }
}




//funcion que maneja la lógica del resize




//crear navs


//prepara los productos agregando clases y estilos a los contenedores











