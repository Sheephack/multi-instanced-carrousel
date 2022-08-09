import './assets/css/style.scss';
import {Carousel} from './assets/js/carrousel_v2.js'


(function init() {
  console.log("hola mundo!");
  const siteWrapper = document.querySelector('#site-wrapper');

  if (siteWrapper) {

    //do
    console.log('This site is loaded');

    let primerSlider = new Carousel (1, ".primerInstancia", false, 0, true, true);
    let segundoSlider = new Carousel (1, ".segundaInstancia", true, 5000, false, false);
    let tercerSlider = new Carousel (1, ".tercerInstancia", false, 0, true, true);
    let cuartoSlider = new Carousel (1, ".cuartaInstancia", false, 0, true, true);
    
    primerSlider.setupSlides()
    segundoSlider.setupSlides()
    tercerSlider.setupSlides()
    cuartoSlider.setupSlides()

  } else {
    //reload
    setTimeout(init, 1000);
  }
})();