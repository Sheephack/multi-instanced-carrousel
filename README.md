# Snippet de carrusel con multi instancias.

## El carrusel debe poder generarse con diferentes opciones y en diferentes instancias para ser aplicado en diferentes landings, a saber:

- Ajuste de cantidad de items basado en breakpoints
- Opcion de bullets de navegacion.
- Deconstruccion al no ser necesario (solo 1 elemento en el contenedor)
- Slide automatico
- POO, que pueda utilizarse multiples ocasiones en diferentes instancias.

### Version log:

- Segunda version: 
    - Se cambia la funcionalidad y construccion del carrusel a forma automatica. Los dots y flechas ya no estan hardcodeados si no que se construyen en funcion de las opciones y de cantidad de items presentes en el carrusel.
    - Se agrega logica de flechas. Las mismas ahora son opcionales.
    - Se agrega logica de dots. Los mismos ahora son opcionales.
    - Se puede configurar el tiempo entre slides como una nueva opcion.
    - Se cambia semanticamente el valor de las flechas de desplazamiento (<a> por <button>)
    - TODO: Breakpoints y ajuste de cantidad de items por slide.

- Se registra primer instancia funcional. Dots funcionales, autoslide opcional funcional.
