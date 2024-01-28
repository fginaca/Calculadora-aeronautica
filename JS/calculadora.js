// declaracion de variables


// let invalidAcftCode = true;

// let invalidFuel = true;
let indexAcft = 0;
let error = false;
let unidad = `litros`;
let resultados_mostrados = false;


// Tomo la configuracion del usuario

if (localStorage.getItem(`unidad`)) {
    unidad = localStorage.getItem(`unidad`);
} else {
    localStorage.setItem(`unidad`, unidad);
}
revisar_unidades ();

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
    constructor(nombre, acft, trip, altn, extra, total, unidad) {
        this.nombre = nombre;
        this.acft = acft;
        this.trip = trip;
        this.altn = altn;
        this.extra = extra;
        this.total = total;
        this.unidad = unidad;
    }
}

class Usuario {
    constructor(usuario, rutas) {
        this.usuario = usuario;
        this.rutas = [];
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
        for (let el of aeronaves) {
            lista_aeronaves.push(el.modelo)
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

// let ruta_guardada = new Ruta();


// traigo formulario

let form = document.querySelector('form');


// traigo el div para los resultados



// main


// Seleccion de unidades 

document.querySelector(`#litros`).addEventListener(`click`, () => {
    unidad = `litros`;
    localStorage.setItem(`unidad`, unidad)
    document.querySelector(`#galones`).className = ``;
    document.querySelector(`#litros`).className = `selected`;
})
document.querySelector(`#galones`).addEventListener(`click`, () => {
    unidad = `galones`;
    localStorage.setItem(`unidad`, unidad);
    document.querySelector(`#litros`).className = ``;
    document.querySelector(`#galones`).className = `selected`;
})

if (unidad == `litros`) {

}

//cargar rutas guardadas del usuario

let usuarios = [];
usuarios = JSON.parse(localStorage.getItem(`usuarios`));
let lista_nombres = [];
for (let el of usuarios) {
    lista_nombres.push(el.nombre);
}
console.table(lista_nombres)
let usuario_logeado = usuarios[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))];
console.table(usuario_logeado);

let lista = document.querySelector(`#lista_rutas`);

let lista_rutas = [];

mostrar_rutas_guardadas();





// Tomo los datos del formulario, hago los calculos y los muestro por pantalla

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // result.innerHTML = ``;


    datosDeEntrada.aeronave = (document.querySelector('#acft').value).toUpperCase();
    datosDeEntrada.trip = document.querySelector('#trip').value;
    datosDeEntrada.altn = document.querySelector('#altn').value;
    datosDeEntrada.extra = document.querySelector('#extra').value;

    indexAcft = lista_aeronaves.indexOf(datosDeEntrada.aeronave);

    indexAcft == -1 && (
        mostrar_mensaje(`Codigo de aeronave invalido`, `El codigo ingresado no está en la base de datos`),
        error = true
    )

    // alert(`La aeronave no esta en la base de datos, intente con PA38 o C152`);
    // invalidAcftCode = true;
    datosDeEntrada.extra < 30 && (
        mostrar_mensaje(`FUERA DE NORMA`, `Tiempo extra por contingencias no debe ser inferior a 30 minutos`),
        error = true
    )


    // alert('Tiempo extra por contingencias no puede ser inferior a 30 minutos, intentelo nuevamente.');

    resultados = calculoCombustible(aeronaves[indexAcft].consumo, aeronaves[indexAcft].velCrucero);

    resultados.totalFuel <= aeronaves[indexAcft].tanque ? mostrar_resultados(resultados) : mostrar_mensaje(`PELIGRO`, `La capacidad de combustible de la aeronave es insuficiente para el vuelo`);


    //Inserto elementos para guardar ruta

    let result = document.querySelector('#respuestas');
    let input = document.createElement('input');
    input.placeholder = `Nombre de la ruta`;
    input.type = 'text';
    input.id = 'nombre_ruta';
    result.append(input);

    let boton = document.createElement('button');
    boton.innerText = `Guardar resultados`;

    //Guardar ruta


    boton.addEventListener('click', () => {
        // ruta_guardada.nombre = document.querySelector('#nombre_ruta').value;
        // ruta_guardada.acft = datosDeEntrada.aeronave;
        // ruta_guardada.trip = resultados.tripFuel;
        // ruta_guardada.altn = resultados.altnFuel;
        // ruta_guardada.extra = resultados.extraFuel;
        // ruta_guardada.total = resultados.totalFuel;
        console.log(unidad)
        if (document.querySelector('#nombre_ruta').value != ``) {
            let ruta_guardar = new Ruta(document.querySelector('#nombre_ruta').value, document.querySelector('#acft').value.toUpperCase (), resultados.tripFuel, resultados.altnFuel, resultados.extraFuel, resultados.totalFuel, unidad);

            !lista_rutas.includes(ruta_guardar.nombre) ? usuario_logeado.rutas.push(ruta_guardar) : mostrar_mensaje(`La ruta ya existe`, `Ingrese un nombre distinto`)

            usuarios[lista_nombres.indexOf(usuario_logeado.nombre)].rutas = usuario_logeado.rutas;

            localStorage.setItem(`usuarios`, JSON.stringify(usuarios));

            lista_rutas = [];
            for (let el of usuario_logeado.rutas) {
                lista_rutas.push(el.nombre);
            }

            mostrar_rutas_guardadas();
        } else {
            mostrar_mensaje(`Ingrese un nombre para la ruta`, ``);
        }

    })

    boton.className = `boton`
    result.append(boton);
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

    if (unidad == `galones`) {
        for (prop in resCombu) {
            resCombu[prop] = (resCombu[prop] * 0.264172).toFixed(2);
        }
    }
    return resCombu;
}

function mostrar_resultados(objeto) {
    resultados_mostrados && document.querySelector(`#respuestas`).remove();
    clon = document.querySelector(`template`).content.cloneNode(true);
    document.querySelector(`#calculadora`).append(clon);
    document.querySelector(`#respuestas`).innerHTML = `
    <h2>Resultados:</h2>                        
    <ul>
    <li>Trip fuel: ${objeto.tripFuel} ${unidad}</li>
                <li>Altn fuel: ${objeto.altnFuel} ${unidad}</li>
                <li>Extra fuel: ${objeto.extraFuel} ${unidad}</li>
                <li>Total fuel: ${objeto.totalFuel} ${unidad}</li>
                </ul>
                `
    resultados_mostrados = true;
    revisar_unidades ();
}

function mostrarObjetoComoLista(padre, objeto) {
    let p;
    for (propiedad in objeto) {
        p = document.createElement('p');
        p.innerText = `${propiedad}: ${objeto[propiedad]}`;
        padre.append(p);
    }
}

function mostrar_mensaje(titulo, mensaje) {
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

function mostrar_rutas_guardadas() {
    lista.innerHTML = ``;
    for (let el of usuario_logeado.rutas) {
        lista_rutas.push(el.nombre);
        let li = document.createElement(`li`);
        li.innerText = el.nombre;

        // al clickear en las rutas

        li.addEventListener(`click`, () => {
            resultados.tripFuel = JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].trip;
            resultados.altnFuel = JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].altn;
            resultados.extraFuel = JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].extra;
            resultados.totalFuel = JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].total;
            unidad = JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].unidad;
            console.log(unidad)

            revisar_unidades (); 
            console.log(unidad)


            mostrar_resultados(resultados);

            let padre = document.querySelector(`#respuestas`);
            let lista = padre.querySelector(`ul`);
            let p = document.createElement(`p`).innerText = `Codigo aeronave: ${JSON.parse(localStorage.getItem(`usuarios`))[lista_nombres.indexOf(JSON.parse(sessionStorage.getItem(`usuario_logeado`)))].rutas[lista_rutas.indexOf(el.nombre)].acft}`;
            lista.append (p);
        })

        lista.append(li)
    }
}

function revisar_unidades () {
    if (unidad == `litros`) {
        document.querySelector(`#galones`).className = ``;
        document.querySelector(`#litros`).className = `selected`;
    } else if (unidad == `galones`) {
        document.querySelector(`#litros`).className = ``;
        document.querySelector(`#galones`).className = `selected`;
    }
}