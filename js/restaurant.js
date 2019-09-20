var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    if(!horarioReservado){return;}
    return this.horarios = this.horarios.filter(horario => horario !== horarioReservado)
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    return (this.calificaciones.length ? promedio(this.calificaciones) : 0);
}

function sumatoria(numeros){
    let sumatoriaTotal = 0;
    numeros.forEach(numero => sumatoriaTotal += numero);
    return sumatoriaTotal;
}

const promedio = (numeros) => sumatoria(numeros) / numeros.length;

