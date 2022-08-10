const startMiniCarousel = () => {
    const siteWrapper = document.querySelector('#site-wrapper-inweek');
    const parentCarousel = siteWrapper.querySelector('.productos');
    const parentSliderAmountOfSlides = parentCarousel.querySelectorAll('.item-slider');

    //Build de carousel
    const buildCarousel = (container) => {
        const slides = container.querySelectorAll('.photo-slider-on .item-innerSlider');
        if(slides.length > 3) {
            // crea flechas de navegacion
            const navigationContainer = document.createElement('div');
            navigationContainer.classList.add('nav-wrapper-inner');
            container.append(navigationContainer);
            const prevButton = document.createElement('button');
            prevButton.classList.add('nav-left-inner');
            const nextButton = document.createElement('button');
            nextButton.classList.add('nav-right-inner');
            navigationContainer.append(prevButton, nextButton);

            let direction;

            const track = document.querySelector('.photo-slider-on .slider__images'); //slider o ul     
            const carousel = document.querySelector('.photo-slider-on .slider__wrapper'); //contenedor de ul    
            const bigImage = siteWrapper.querySelector('#productos li.active .producto__header__img--main')

            // crea eventos para mover los items
            nextButton.addEventListener('click', function() {
                direction = -1;
                carousel.style.justifyContent = 'flex-start';
                track.style.transform = 'translate(-20%)';
                // Verifica que la primer imagen del slider sea la visible en el carousel padre
                setTimeout(function() {
                    let actualFirstChild = track.firstElementChild.firstElementChild
                    if(actualFirstChild.src != bigImage.src) {
                        bigImage.src = actualFirstChild.src
                    }

                } , 300);
            })
              
            prevButton.addEventListener('click', function() {
                if (direction === -1) {
                    direction = 1;
                    track.appendChild(track.firstElementChild);
                  }
                  carousel.style.justifyContent = 'flex-end';    
                  track.style.transform = 'translate(20%)';  
                  // Verifica que la primer imagen del slider sea la visible en el carousel padre
                  setTimeout(function() {
                    let actualFirstChild = track.firstElementChild.firstElementChild
                    if(actualFirstChild.src != bigImage.src) {
                        bigImage.src = actualFirstChild.src
                    }

                } , 300);
            })

            track.addEventListener('transitionend', function() {
                // llama al ultimo elemento y lo apenda al frente
                if (direction === 1) {
                  track.prepend(track.lastElementChild);
                } else {
                  track.appendChild(track.firstElementChild);
                }
                track.style.transition = 'none';
                track.style.transform = 'translate(0)';
                setTimeout(() => {
                  track.style.transition = 'all 0.1s';
                })
              }, false);

        }else{
            console.log("no es necesario crear carrusel");
            container.classList.remove('photo-slider-on'); 
            //Si el carrusel no se inicia, se debe remover la clase que lo genera para no generar error en un slide que si lo tenga
        }
    }
    
    const innerCarouselBuilder = () => {
        for (let i = 0; i < parentSliderAmountOfSlides.length; i++) {
            const parentSlider = parentSliderAmountOfSlides[i].classList.contains('active');

            if (parentSlider == true) {
                const innerSlider = parentSliderAmountOfSlides[i].querySelector('.active #innerSlider');
                innerSlider.classList.add('photo-slider-on');
                if (innerSlider) {
                    buildCarousel(innerSlider);
                }
            }
        }
    }
    if(parentSliderAmountOfSlides.length > 1) {
        //Trigger de inicializacion por slide (detecta el slide activo a inicilizar el carrusel)
        innerCarouselBuilder();
    }else if(parentSliderAmountOfSlides.length == 1){
        // Crea solo una instancia de Carrusel cuando solo hay un slide en el carrusel Padre
        const container = siteWrapper.querySelector('#innerSlider');
        container.classList.add('photo-slider-on'); //Sin esta clase no funciona el minicarrusel
        buildCarousel(container);
    }else{
        console.log("no hay slides de productos");
    }

    // selector de imagenes a imagen principal
    const imageChanger = event => {
        //Validar existencia de carrusel padre
        const carruselContainer = siteWrapper.querySelector("#productos .productos_wrapper")
        const condition = carruselContainer.classList.contains("carousel-on") ? true : false;
        const query = condition ? "#productos .item-slider.active header .producto__header__img img " : "#productos .item-slider header .producto__header__img img ";
        const productImage = siteWrapper.querySelector(query);
        
        productImage.setAttribute('src', event.target.getAttribute('src'));
    }
    const itemSelector = siteWrapper.querySelectorAll('.seccion-innerSlider .item-innerSlider .slider-img')
    for (let p = 0; p < itemSelector.length; p++) {
        var item = itemSelector[p];
        item.addEventListener('click', imageChanger);       
    }
}