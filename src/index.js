import './assets/css/style.scss';
import {CarouselInit} from './assets/js/carrousel_v2.js'
import {CarouselV3} from './assets/js/carousel.js'


(function init() {
  console.log("hola mundo!");
  const siteWrapper = document.querySelector('#site-wrapper');

  if (siteWrapper) {

    //do
    console.log('This site is loaded');
    CarouselInit()
    let primerSlider = new Carousel (1, ".primerInstancia", 0, true, true, true);
    let segundoSlider = new Carousel (1, ".segundaInstancia", 5000, false, false, false);
    let tercerSlider = new Carousel (1, ".tercerInstancia", 0, true, true, false);
    let cuartoSlider = new Carousel (1, ".cuartaInstancia", 0, true, true, false);
    
    primerSlider.setupSlides()
    segundoSlider.setupSlides()
    tercerSlider.setupSlides()
    cuartoSlider.setupSlides()

    // let carousel3 = new CarouselV3 (".quintaInstancia", true, true, true, true, true)
    // carousel3.startCarousel()
    // let carousel4 = new CarouselV3 (".sextaInstancia", true, true, true, true, true)
    // carousel4.startCarousel()

  } else {
    //reload
    setTimeout(init, 1000);
  }
})();