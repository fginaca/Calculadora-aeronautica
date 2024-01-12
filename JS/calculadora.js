// declaracion de variables

let invalidAcftCode = true;
let invalidFuel = true;
let ejecutar = true;
let indexAcft = 0;

// creacion de clases

class Aeronave {
    constructor(modelo,tanque,consumo,velCrucero,plazas,cargo,mtow) {
        this.modelo = modelo;
        this.tanque = tanque;
        this.consumo = consumo;
        this.velCrucero = velCrucero;
        this.plazas = plazas;
        this.cargo = cargo;
        this.mtow = mtow;
    }
}

// creacion base de datos aeronaves 

let aeronaves = [];

aeronaves.push( new Aeronave('PA38', 112, 22, 100, 2, 35, 700));
aeronaves.push( new Aeronave('C152', 95.74, 23.1, 95, 2, 35, 700));

// objetos con datos

let datosDeEntrada = {
    aeronave: 'aeronave',
    trip: 0,
    altn: 0,
    extra: 30,
    pax: 1,
    unidadComb: 'litros',
}

let resultados = {
    tripFuel: 0,
    altnFuel: 0,
    extraFuel: 0,
    totalFuel: 0,
}
// traigo formulario
let form = document.querySelector ('form');

// traigo el div para los resultados

let result = document.querySelector('#respuestas');
// main

// Tomo los datos del formulario

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    datosDeEntrada.aeronave = (document.querySelector('#acft').value).toUpperCase();
    datosDeEntrada.trip = document.querySelector('#trip').value;
    datosDeEntrada.altn = document.querySelector('#altn').value;
    datosDeEntrada.extra = document.querySelector('#extra').value;

    switch (datosDeEntrada.aeronave) {
        case 'PA38':
            // calculoCombustible (aeronaves[0].consumo, aeronaves[0].velCrucero);
            // capacidad = capacidadTanquePA38;
            indexAcft = 0;
            invalidAcftCode = false;
            break;
        case 'C152':
            // calculoCombustible (consumoC152, velCruceroC152);
            // capacidad = capacidadTanqueC152;
            indexAcft = 1;
            invalidAcftCode = false;
            break;
        default:
    }

    invalidAcftCode && alert(`La aeronave no esta en la base de datos, intente con PA38 o C152`);
    invalidAcftCode = true;
    datosDeEntrada.extra < 30 && alert('Tiempo extra por contingencias no puede ser inferior a 30 minutos, intentelo nuevamente.');
    
    resultados = calculoCombustible (aeronaves[indexAcft].consumo, aeronaves[indexAcft].velCrucero);
    
    resultados.totalFuel <= aeronaves[indexAcft].tanque ? mostrarObjetoComoLista (result, resultados) : alert(`La capacidad de combustible de la aeronave no es suficiente para el vuelo.`);
})








// funciones

function calculoCombustible(consumo, velCrucero) {
    let resCombu = {
        tripFuel: 0,
        altnFuel: 0,
        extraFuel: 0,
        totalFuel: 0,
    }
    resCombu.tripFuel = (datosDeEntrada.trip / velCrucero) * consumo; // calculo combustible para el viaje
    resCombu.altnFuel = (datosDeEntrada.altn / velCrucero) * consumo; // calculo combustible extra para llegar a la alternativa
    resCombu.extraFuel = (datosDeEntrada.extra / 60) * consumo; // calculo combustible extra por contingencias
    resCombu.totalFuel = resCombu.tripFuel + resCombu.altnFuel + resCombu.extraFuel;
    return resCombu;
}

function mostrarObjetoComoLista (padre, objeto) {
    let p;
    for (propiedad in objeto) {
        p = document.createElement ('p');
        p.innerText = `${propiedad}: ${objeto[propiedad]}`;
        padre.append(p);
    }
}