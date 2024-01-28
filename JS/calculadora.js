// declaracion de variables

let invalidAcftCode = true;
let invalidFuel = true;
let ejecutar = true;
let indexAcft = 0;
let error = false;

// creacion de clases

// class Aeronave {
//     constructor(modelo,tanque,consumo,velCrucero,plazas,cargo,mtow) {
//         this.modelo = modelo;
//         this.tanque = tanque;
//         this.consumo = consumo;
//         this.velCrucero = velCrucero;
//         this.plazas = plazas;
//         this.cargo = cargo;
//         this.mtow = mtow;
//     }
// }
 class Ruta {
    constructor(nombre,acft,trip,altn,extra,total) {
        this.nombre = nombre;
        this.acft = acft;
        this.trip = trip;
        this.altn = altn;
        this.extra = extra;
        this.total = total;
    }
 }
// creacion base de datos aeronaves 

let aeronaves = [];
let lista_aeronaves = [];

// aeronaves.push( new Aeronave('PA38', 112, 22, 100, 2, 35, 700));
// aeronaves.push( new Aeronave('C152', 95.74, 23.1, 95, 2, 35, 700));

// traigo los datos de la base de datos de aeronaves y creo lista con los modelos en la base de datos

fetch('../acft_db.json')
    .then(response => response.json())
    .then(data => {
        aeronaves = data
        for ( let el of aeronaves) {
            lista_aeronaves.push (el.modelo)
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró la base de datos de aeronaves',
            // icon: 'error',
            color: '#44ff28',
            background: '#151515',
            showConfirmButton: false,        
        })
    })

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

let ruta_guardada = new Ruta ();


// traigo formulario
let form = document.querySelector ('form');

// traigo el div para los resultados

let result = document.querySelector('#respuestas');
// main

// funcion de boton para cargar resultados guradados

// let boton = document.querySelector('button');
// boton.addEventListener('click', ()=> {
//     ruta_guardada = JSON.parse(localStorage.getItem('ruta_guardada_local'));
//     mostrarObjetoComoLista(result,ruta_guardada);
//     boton.remove();
// })
// Tomo los datos del formulario, hago los calculos y los muestro por pantalla

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    result.innerHTML = ``;

    datosDeEntrada.aeronave = (document.querySelector('#acft').value).toUpperCase();
    datosDeEntrada.trip = document.querySelector('#trip').value;
    datosDeEntrada.altn = document.querySelector('#altn').value;
    datosDeEntrada.extra = document.querySelector('#extra').value;

    indexAcft = lista_aeronaves.indexOf (datosDeEntrada.aeronave);

    indexAcft == -1 &&  (
        mostrar_mensaje (`Codigo de aeronave invalido`, `El codigo ingresado no está en la base de datos`),
        error = true
    )

    // alert(`La aeronave no esta en la base de datos, intente con PA38 o C152`);
    invalidAcftCode = true;
    datosDeEntrada.extra < 30 && (
        mostrar_mensaje (`FUERA DE NORMA`, `Tiempo extra por contingencias no debe ser inferior a 30 minutos`),
        error = true
    )
    
    
    // alert('Tiempo extra por contingencias no puede ser inferior a 30 minutos, intentelo nuevamente.');
    
    resultados = calculoCombustible (aeronaves[indexAcft].consumo, aeronaves[indexAcft].velCrucero);
    
    resultados.totalFuel <= aeronaves[indexAcft].tanque ? mostrarObjetoComoLista (result, resultados) : mostrar_mensaje (`PELIGRO`, `La capacidad de combustible de la aeronave es insuficiente para el vuelo`);
    

    let input = document.createElement('input');
    input.placeholder = `Nombre de la ruta`;
    input.type = 'text';
    input.id = 'nombre_ruta';
    result.append (input);

    
    let boton = document.createElement ('button');
    boton.innerText = `Guardar resultados`;
    boton.addEventListener('click', ()=> {
        ruta_guardada.nombre = document.querySelector('#nombre_ruta').value;
        ruta_guardada.acft = datosDeEntrada.aeronave;
        ruta_guardada.trip = resultados.tripFuel;
        ruta_guardada.altn = resultados.altnFuel;
        ruta_guardada.extra = resultados.extraFuel;
        ruta_guardada.total = resultados.totalFuel;

        localStorage.setItem('ruta_guardada_local', JSON.stringify(ruta_guardada));
    })
    result.append (boton);
})








// funciones

function calculoCombustible(consumo, velCrucero) {
    let resCombu = {
        tripFuel: 0,
        altnFuel: 0,
        extraFuel: 0,
        totalFuel: 0,
    }
    resCombu.tripFuel = Number(((datosDeEntrada.trip / velCrucero) * consumo).toFixed(2)); // calculo combustible para el viaje
    resCombu.altnFuel = Number(((datosDeEntrada.altn / velCrucero) * consumo).toFixed(2)); // calculo combustible extra para llegar a la alternativa
    resCombu.extraFuel = Number(((datosDeEntrada.extra / 60) * consumo).toFixed(2)); // calculo combustible extra por contingencias
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

function mostrar_mensaje (titulo, mensaje) {
    Swal.fire({
        title: `${titulo}`,
        text: `${mensaje}`,
        color: '#44ff28',
        background: '#151515',
        confirmButtonText: 'Volver',
        confirmButtonColor: '#151515',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'boton',
        }    
    })
}