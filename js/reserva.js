var Reserva = function (horario, cantidadDePersonas, precioPorPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadDePersonas = cantidadDePersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
};

Reserva.prototype.calcularPrecioBase = function () {
    return this.cantidadDePersonas * this.precioPorPersona;
};

Reserva.prototype.calcularPrecioFinal = function () {
    let totalDescuentos = calcularDescuentos(this.calcularPrecioBase(), this.codigoDescuento, this.cantidadDePersonas, this.precioPorPersona);
    let totalAdicionales = calcularAdicionales(this.horario.getDay(), this.horario.getHours(), this.calcularPrecioBase());
    return ((this.calcularPrecioBase() + totalAdicionales) - totalDescuentos);
};

function calcularAdicionales(dia, hora, precioBase) {
    let adicionales = 0;
    if (dia === 4 || dia === 5 || dia === 6) {
        adicionales += precioBase * 0.10;
    }
    //Verifica si la hora está dentro del rango de las 13 a 14 y 20 a 21
    if (hora === 13 || hora === 14 || hora === 20 || hora === 21) {
        adicionales += precioBase * 0.05;
    }
    return adicionales;
}

function calcularDescuentos(precioBase, codigoDeDescuento, cantidadDePersonas, precioPorPersona) {
    let descuentos = 0;
    //calcula el descuento según el codigo dado
    switch (codigoDeDescuento) {
        case 'DES15':
            descuentos += precioBase * 0.15;
            break;
        case 'DES200':
            descuentos += 200;
            break;
        case 'DES1':
            descuentos += precioPorPersona;
            break;
    }
    //calcula el descuento segun la cantidad de personas
    switch (true) {
        case (cantidadDePersonas >= 4 && cantidadDePersonas <= 6):
            descuentos += precioBase * 0.05;
            break;
        case (cantidadDePersonas >= 7 && cantidadDePersonas <= 8):
            descuentos += precioBase * 0.10;
            break;
        case (cantidadDePersonas > 8):
            descuentos += precioBase * 0.15;
            break;
    }
    return descuentos;
}