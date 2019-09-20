var expect = chai.expect;

//reservarHorario(horario):

describe('Se reserva un horario con la funcionalidad reservarHorario(horario)', function () {
    var restaurante = new Restaurant();
    beforeEach(function () {
        restaurante.horarios = ["15:30"];
    });

    it('Dada una reserva a las 15:30, el arreglo horarios del restaurante disminuye de tamaño', function () {
        var cantidadHorariosAnterior = restaurante.horarios.length;
        restaurante.reservarHorario('15:30');
        expect(restaurante.horarios.length).to.equal(cantidadHorariosAnterior - 1);
    });

    it('Dado un horario no disponible en el restaurant, el arreglo de horarios conserva la misma longitud', function () {
        var cantidadHorariosAnterior = restaurante.horarios.length;
        restaurante.reservarHorario('12:00');
        expect(restaurante.horarios.length).to.equal(cantidadHorariosAnterior);
    });

    it('Dado un horario no disponible en el restaurant, el arreglo de horarios conserva sus mismos elementos', function () {
        var horariosRestaurantAnterior = restaurante.horarios;
        restaurante.reservarHorario('12:00');
        expect(restaurante.horarios).to.eql(horariosRestaurantAnterior);
    });

    it('Al no indicar un horario, el arreglo de horarios conserva su mismo tamaño', function () {
        var horariosRestaurantAnterior = restaurante.horarios;
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.equal(horariosRestaurantAnterior);
    });

    it('Al no indicar un horario, el arreglo de horarios conserva sus mismos elementos', function () {
        var horariosRestaurantAnterior = restaurante.horarios;
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.eql(horariosRestaurantAnterior);
    });

});

//obtenerPuntuación()

describe(' Se calcula la puntuacion del restaurante con el promedio total de las calificaciones utilizando obtenerPuntuación()', function () {
    var restaurante = new Restaurant();
    it('Dado un restaurant con calificaciones [6, 7, 9, 10, 5], la puntuacion es de 7.4', function () {
        restaurante.calificaciones = [6, 7, 9, 10, 5];
        expect(restaurante.obtenerPuntuacion()).to.equal(7.4);
    });

    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function () {
        restaurante.calificaciones = [];
        expect(restaurante.obtenerPuntuacion()).to.equal(0);
    });

});

//calificar()

describe('Se ingresa una nueva calificacion al restaurant usando calificar(nuevaCalificacion)', function () {
    var restaurante = new Restaurant();
    beforeEach(function () {
        restaurante.calificaciones = [];
    });
    it('Dada una calificacion entre 1 y 9, se añade una nueva calificacion al arreglo de calificaciones', function () {
        var cantidadCalificacionesAnterior = restaurante.calificaciones.length;
        restaurante.calificar(9);
        expect(restaurante.calificaciones.length).to.equal(cantidadCalificacionesAnterior + 1);
    });

    it('Dada una calificacion mayor que 9, el arreglo de calificaciones se mantiene igual', function () {
        var cantidadCalificacionesAnterior = restaurante.calificaciones.length;
        restaurante.calificar(10);
        expect(restaurante.calificaciones.length).to.equal(cantidadCalificacionesAnterior);
    });

    it('Dada una calificacion menor que 0 el arreglo de calificaciones se mantiene igual', function () {
        var cantidadCalificacionesAnterior = restaurante.calificaciones.length;
        restaurante.calificar(-3);
        expect(restaurante.calificaciones.length).to.equal(cantidadCalificacionesAnterior);
    });

    it('Dada una calificacion no entera, el arreglo de calificaciones se mantiene igual', function () {
        var cantidadCalificacionesAnterior = restaurante.calificaciones.length;
        restaurante.calificar('5');
        expect(restaurante.calificaciones.length).to.equal(cantidadCalificacionesAnterior);
    });

});

//buscarRestaurante(id)

describe('Dado un id de restaurante, se busca un restaurante utilizando buscarRestaurante(id)', function () {
    var restaurantesTest = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    ];
    var testListados = new Listado(restaurantesTest);
    it('Se busca un id existente', function () {
        expect(testListados.buscarRestaurante(1)).to.eql(restaurantesTest[0]);
    });

    it('Se busca el restaurante con id inexistente', function () {
        expect(testListados.buscarRestaurante(11)).to.be.a('string');
    });
});

//obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)

describe('Dado un rubro, una ciudad y un horario se filtran los restaurantes utilizando obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)', function () {
    var restaurantesTest = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    ];
    var restaurantesListados = new Listado(restaurantesTest);
    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York al horario de las 15:30', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes('Asiática', 'Nueva York', '15:30')).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con horario null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes('Asiática', 'Nueva York', null)).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con ciudad null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes('Asiática', null, '15:30')).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con rubro null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes(null, 'Nueva York', '15:30')).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con horario null y ciudad null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes('Asiática', null, null)).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con horario null y rubro null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes(null, 'Nueva York', null)).to.eql(restaurantesDePrueba);
    });

    it('Se filtra correctamente TAO Uptown de comida asiática en Nueva York con ciudad null y rubro null', function () {
        var restaurantesDePrueba = [restaurantesTest[0]];
        expect(restaurantesListados.obtenerRestaurantes(null, null, '15:30')).to.eql(restaurantesDePrueba);
    });

});

//reserva(horario,cantidadDePersonas,precioPorPersona,codigoDeDescuento)

describe('Dado un horario, cantidad de personas, precio por persona y codigo de descuento, se efectua una reserva', function () {
    it('calcula correctamente el precio base', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.calcularPrecioBase()).to.equal(2800);
    });

    it('calcula correctamente el precio final', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.calcularPrecioFinal()).to.equal(2450);
    });

    it('calcula bien el descuento de $200', function () {
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reserva2.calcularPrecioFinal()).to.equal(100);
    });

    it('calcula bien el descuento de 15%', function () {
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES15");
        expect(reserva2.calcularPrecioFinal()).to.equal(255);
    });

});