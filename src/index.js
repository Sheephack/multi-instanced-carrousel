import './assets/css/style.scss';
import {Carousel} from './assets/js/carrousel_v2.js'


(function init() {
  console.log("hola mundo!");
  const siteWrapper = document.querySelector('#site-wrapper');

  if (siteWrapper) {

    //do
    console.log('This site is loaded');

    let primerSlider = new Carousel (1, ".primerInstancia", false);
    let segundoSlider = new Carousel (1, ".segundaInstancia", true);
    let tercerSlider = new Carousel (1, ".tercerInstancia", false);
    
    primerSlider.setupSlides()
    segundoSlider.setupSlides()
    tercerSlider.setupSlides()

  } else {
    //reload
    setTimeout(init, 1000);
  }
})();