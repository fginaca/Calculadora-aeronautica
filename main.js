// Declaracion de variables

let invalidAcftCode = true;
let invalidFuel = true;
let ejecutar = true;
let totalFuel = 0;
let tripFuel;
let altnFuel;
let extraFuel;
let capacidad;
let aeronave;
let trip;
let altn;
let extra;
let pasajeros = 1;




//Base de datos aeronaves

    //PA38

const capacidadTanquePA38 = 110; // litros
const consumoPA38 = 22; // litros por hora a velocidad crucero
const velCruceroPA38 = 100; // nudos (millas nauticas por hora)
const plazasPA38 = 2; // personas
const cargoPA38 = 35; // kilogramos
const mtowPA38 = 800; // kilogramos


    //C152

const capacidadTanqueC152 = 95.74; // litros
const consumoC152 = 23.1; // litros por hora a velocidad crucero
const velCruceroC152 = 95; // nudos (millas nauticas por hora)
const plazasC152 = 2; // personas
const cargoC152 = 35; // kilogramos
const mtowC152 = 700; // kilogramos




//Programa principal
while (ejecutar) {

    // Combustible
    let ejecutarCombustible = confirm('¡Bienvenido!\n¿Desea realizar calculos de combustible?');
    while (ejecutarCombustible) {
        // Ingreso de datos

        // pido distancia a recorrer
        trip = pedirNumeroPositivo('Indique la distancia al aeropuerto de destino, en millas nauticas: '); 
        // Pido extra a la alternativa
        altn = pedirNumeroPositivo('Distancia desde el aeropuerto de destino hasta el aeropuerto de alternativa, en millas nauticas: '); 
        // Pido extra por contingencias
        extra = pedirNumeroPositivo('Tiempo extra por contingencias, en minutos: '); 
        // Verifico que cumpla con el tiempo minimo segun normativa
        while (extra < 30) {
            extra = pedirNumeroPositivo('Tiempo extra por contingencias no puede ser inferior a 30 minutos, intentelo nuevamente: ');
        }
        // Pido la unidad de los resultados y la verifico
        let unidadComb = prompt('Ingrese la unidad en la cual se expresaran los resultados (litros o galones): ').toLowerCase();
        while (invalidFuel) {
            if (unidadComb == 'galones') {
                invalidFuel = false;
            } else if (unidadComb == 'litros') {
                invalidFuel = false;
            } else {
                unidadComb = prompt('Por favor ingrese una de las dos opciones: (litros o galones)').toLowerCase();
            }
        }


            // Calculo de las cantidades de combustible necesarias

        aeronave = prompt('Ingrese el designador OACI de la aeronave: ').toUpperCase(); 
        while (invalidAcftCode) {
            switch (aeronave) {
                case 'PA38':
                    calculoCombustible (consumoPA38, velCruceroPA38);
                    capacidad = capacidadTanquePA38;
                    invalidAcftCode = false;
                    break;
                case 'C152':
                    calculoCombustible (consumoC152, velCruceroC152);
                    capacidad = capacidadTanqueC152;
                    invalidAcftCode = false;
                    break;
                default:
                    aeronave = prompt('El codigo de aeronave ingresado no esta en la base de datos, intente con uno diferente.').toUpperCase;
            }
        }

        totalFuel = tripFuel + altnFuel + extraFuel; // Calculo combustible total

            // Imprimo resultados por pantalla


        if (totalFuel <= capacidad) {
            if (unidadComb == 'galones') {
                totalFuel = (totalFuel * 0.264172).toFixed(2);
                tripFuel = (tripFuel * 0.264172).toFixed(2);
                altnFuel = (altnFuel * 0.264172).toFixed(2);
                extraFuel = (extraFuel * 0.264172).toFixed(2);
            } else{
                totalFuel = totalFuel.toFixed(2);
                tripFuel = tripFuel.toFixed(2);
                altnFuel = altnFuel.toFixed(2);
                extraFuel = extraFuel.toFixed(2);
            }
            alert('Combustible necesario para el vuelo: ' + tripFuel + ' ' + unidadComb + '. \nCombustible necesario para la alernativa: ' + altnFuel + ' ' + unidadComb + '. \nCombustible para ' + extra + ' minutos por contingencias: ' + extraFuel + ' ' + unidadComb + '\nCombustible total: ' + totalFuel + ' ' + unidadComb + '. \n¡Buen vuelo!');
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
    let ejecutarPeso = confirm('¿Desea realizar calculos de peso?');
    while (ejecutarPeso) {
        while (invalidAcftCode) {
            aeronave = prompt('Ingrese el designador OACI de la aeronave: ').toUpperCase(); 
            switch (aeronave) {
                case 'PA38':
                    calculoPeso (plazasPA38, cargoPA38, mtowPA38);
                    invalidAcftCode = false;
                    break;
                case 'C152':
                    calculoPeso (plazasC152, cargoC152, mtowC152);
                    invalidAcftCode = false;
                    break;
                default:
                    aeronave = prompt('El codigo de aeronave ingresado no esta en la base de datos, intente con uno diferente.').toUpperCase;
            }
        }
        ejecutarPeso = confirm('¿Desea volver a calcular peso?')
        if (ejecutarCombustible) {
            //Reiniciar banderas

            invalidAcftCode = true;
            invalidFuel = true;
        }
    }
    ejecutar = confirm('¿Desea reiniciar el programa?');
}



//Funciones

//Calcula las cantidades de combustible para los items principales segun regulaciones internacionales
function calculoCombustible(consumo, velCrucero) {
    tripFuel = (trip / velCrucero) * consumo; // calculo combustible para el viaje
    altnFuel = (altn / velCrucero) * consumo; // calculo combustible extra para llegar a la alternativa
    extraFuel = (extra / 60) * consumo; // calculo combustible extra por contingencias

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
