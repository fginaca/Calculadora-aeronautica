// Declaracion de variables

let invalidAcftCode = true;
let invalidFuel = true;
let ejecutar = true;
let indexAcft = 0;
// let totalFuel = 0;
// let tripFuel;
// let altnFuel;
// let extraFuel;
// let capacidad;
// let aeronave;
// let trip;
// let altn;
// let extra;
// let pasajeros = 1;




// //Base de datos aeronaves

//     //PA38

// const capacidadTanquePA38 = 110; // litros
// const consumoPA38 = 22; // litros por hora a velocidad crucero
// const velCruceroPA38 = 100; // nudos (millas nauticas por hora)
// const plazasPA38 = 2; // personas
// const cargoPA38 = 35; // kilogramos
// const mtowPA38 = 800; // kilogramos


//     //C152

// const capacidadTanqueC152 = 95.74; // litros
// const consumoC152 = 23.1; // litros por hora a velocidad crucero
// const velCruceroC152 = 95; // nudos (millas nauticas por hora)
// const plazasC152 = 2; // personas
// const cargoC152 = 35; // kilogramos
// const mtowC152 = 700; // kilogramos

let aeronaves = [];

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
aeronaves.push( new Aeronave('PA38', 110, 22, 100, 2, 35, 700));
aeronaves.push( new Aeronave('C152', 95.74, 23.1, 95, 2, 35, 700));


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
//Programa principal
while (ejecutar) {

    // Combustible
    let ejecutarCombustible = confirm('¡Bienvenido!\n¿Desea realizar calculos de combustible?');
    while (ejecutarCombustible) {
        // Ingreso de datos

        // pido distancia a recorrer
        datosDeEntrada.trip = pedirNumeroPositivo('Indique la distancia al aeropuerto de destino, en millas nauticas: '); 
        // Pido extra a la alternativa
        datosDeEntrada.altn = pedirNumeroPositivo('Distancia desde el aeropuerto de destino hasta el aeropuerto de alternativa, en millas nauticas: '); 
        // Pido extra por contingencias
        datosDeEntrada.extra = pedirNumeroPositivo('Tiempo extra por contingencias, en minutos: '); 
        // Verifico que cumpla con el tiempo minimo segun normativa
        while (datosDeEntrada.extra < 30) {
            datosDeEntrada.extra = pedirNumeroPositivo('Tiempo extra por contingencias no puede ser inferior a 30 minutos, intentelo nuevamente: ');
        }
        // Pido la unidad de los resultados y la verifico
        datosDeEntrada.unidadComb = prompt('Ingrese la unidad en la cual se expresaran los resultados (litros o galones): ').toLowerCase();
        while (invalidFuel) {
            if (datosDeEntrada.unidadComb == 'galones') {
                invalidFuel = false;
            } else if (datosDeEntrada.unidadComb == 'litros') {
                invalidFuel = false;
            } else {
                datosDeEntrada.unidadComb = prompt('Por favor ingrese una de las dos opciones: (litros o galones)').toLowerCase();
            }
        }


            // Calculo de las cantidades de combustible necesarias

        datosDeEntrada.aeronave = prompt('Ingrese el designador OACI de la aeronave: ').toUpperCase(); 
        while (invalidAcftCode) {
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
                    datosDeEntrada.aeronave = prompt('El codigo de aeronave ingresado no esta en la base de datos, intente con uno diferente.').toUpperCase;
            }
        }
        resultados = calculoCombustible (aeronaves[indexAcft].consumo, aeronaves[indexAcft].velCrucero);
        // capacidad = capacidadTanquePA38;

        // totalFuel = tripFuel + altnFuel + extraFuel; // Calculo combustible total

            // Imprimo resultados por pantalla


        if (resultados.totalFuel <= aeronaves[indexAcft].capacidad) {
            if (datosDeEntrada.unidadComb == 'galones') {
                resultados.totalFuel = (resultados.totalFuel * 0.264172).toFixed(2);
                resultados.tripFuel = (resultados.tripFuel * 0.264172).toFixed(2);
                resultados.altnFuel = (resultados.altnFuel * 0.264172).toFixed(2);
                resultados.extraFuel = (resultados.extraFuel * 0.264172).toFixed(2);
            } else{
                resultados.totalFuel = resultados.totalFuel.toFixed(2);
                resultados.tripFuel = resultados.tripFuel.toFixed(2);
                resultados.altnFuel = resultados.altnFuel.toFixed(2);
                resultados.extraFuel = resultados.extraFuel.toFixed(2);
            }
            alert('Combustible necesario para el vuelo: ' + resultados.tripFuel + ' ' + resultados.unidadComb + '. \nCombustible necesario para la alernativa: ' + resultados.altnFuel + ' ' + datosDeEntrada.unidadComb + '. \nCombustible para ' + datosDeEntrada.extra + ' minutos por contingencias: ' + resultados.extraFuel + ' ' + datosDeEntrada.unidadComb + '\nCombustible total: ' + resultados.totalFuel + ' ' + datosDeEntrada.unidadComb + '. \n¡Buen vuelo!');
        } else {
            alert('La capacidad de combustible de la aeronave no es suficiente para el vuelo.');
        }

        //debugging 

        /*console.log(totalFuel)
        console.log(tripFuel)
        console.log(altnFuel)
        console.log(extraFuel)*/


        

        // Consulta si quiere volver a calcular combustible
        ejecutarCombustible = confirm('¿Desea volver a calcular combustible?')

        if (ejecutarCombustible) {
            //Reiniciar banderas

            invalidAcftCode = true;
            invalidFuel = true;
        }
    }

    // Calculo de peso WIP 
    // let ejecutarPeso = confirm('¿Desea realizar calculos de peso?');
    // while (ejecutarPeso) {
    //     while (invalidAcftCode) {
    //         aeronave = prompt('Ingrese el designador OACI de la aeronave: ').toUpperCase(); 
    //         switch (aeronave) {
    //             case 'PA38':
    //                 calculoPeso (plazasPA38, cargoPA38, mtowPA38);
    //                 invalidAcftCode = false;
    //                 break;
    //             case 'C152':
    //                 calculoPeso (plazasC152, cargoC152, mtowC152);
    //                 invalidAcftCode = false;
    //                 break;
    //             default:
    //                 aeronave = prompt('El codigo de aeronave ingresado no esta en la base de datos, intente con uno diferente.').toUpperCase;
    //         }
    //     }
    //     ejecutarPeso = confirm('¿Desea volver a calcular peso?')
    //     if (ejecutarCombustible) {
    //         //Reiniciar banderas

    //         invalidAcftCode = true;
    //         invalidFuel = true;
    //     }
    // }
    ejecutar = confirm('¿Desea reiniciar el programa?');
}



//Funciones

//Calcula las cantidades de combustible para los items principales segun regulaciones internacionales
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

// Calcula el peso de despegue WIP
function calculoPeso (plazas, cargo, mtow) {
    pesoTotal = 0;
    do {
        if(pesoTotal > mtow) {
            alert('Se ha excedido el peso maximo de despegue, reduzca el pasaje y/o el equipaje.');
        }
        // Peso pasajeros
        pasajeros = 0;
        let adultos = pedirNumeroPositivo('Ingrese la cantidad de pasajeros adultos.');
        let infantes = pedirNumeroPositivo('Ingrese la cantidad de infantes.');
        pasajeros = adultos + infantes;
        while (pasajeros > plazas){
            alert('Se excedio la cantidad de ' + plazas + ' plazas disponibles en la aeronave. Por favor revise el pasaje.')
            pasajeros = adultos = infantes = 0;
            adultos = pedirNumeroPositivo('Ingrese la cantidad de pasajeros adultos.');
            infantes = pedirNumeroPositivo('Ingrese la cantidad de infantes.');
            pasajeros = adultos + infantes;
        }
        pesoPax = adultos * 75 + infantes * 35;
        // Peso carga
        let equipaje = pedirNumeroPositivo('Ingrese la cantidad de equipaje en kilogramos:');
        while (equipaje > cargo) {
            alert('Ha excedido la capacidad de la bahia de carga, por favor revise que su equipaje pese menos de ' + cargo + ' kilogramos.');
            equipaje = pedirNumeroPositivo('Ingrese la cantidad de equipaje en kilogramos:');
        }
        // Peso total
        pesoTotal = equipaje + pesoPax;
    } while (pesoTotal > mtow);
}

// Pide un numero al usuario, y verifica que se ingrese un numero y sea positivo
function pedirNumeroPositivo(mensaje) {
    let numero = Number(prompt(mensaje));
    while (isNaN(numero)  || numero < 0) {
        numero = Number(prompt('Por favor ingrese un numero positivo.'));
    }
    return numero;
}

// Pide un numero al usuario y verifica que se ingrese un numero
function pedirNumero(mensaje) {
    let numero = Number(prompt(mensaje));
    while (isNaN(numero)) {
        numero = Number(prompt('Por favor ingrese un numero.'));
    }
    return numero;
}
