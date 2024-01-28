class Usuario {
    constructor (nombre,pass,rutas) {
        this.nombre = nombre;
        this.pass = pass;
        this.rutas = [];
    }
}


let usuarios = [];
let lista_nombres = [];
let login = new Usuario ();
let datos_ventana_login;



// Traigo del local el array de usuarios y lo guardo en 'usuarios'.

if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse (localStorage.getItem('usuarios'));
}

//Creo una lista con los nombres de los usuarios guardados

for( let el of usuarios) {
    lista_nombres.push (el.nombre);
}

//creo las alertas para mostrar por pantalla

let mensaje = document.querySelector ('#mensaje');

// actualizo los valores de usuario y contraseña

let user = document.querySelector ('#usuario');
user.addEventListener ('input', ()=> {
    login.nombre = document.querySelector ('#usuario').value;
})
let password = document.querySelector ('#pass');
password.addEventListener ('input', ()=> {
    login.pass = document.querySelector ('#pass').value;
})


//Login


let form = document.querySelector ('#inicio');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    login.nombre = document.querySelector ('#usuario').value;
    login.pass = document.querySelector ('#pass').value;
    
    if (!lista_nombres.includes (login.nombre)) {
        Swal.fire({
            title: 'Usuario inexistente',
            text: '¿Desea crear un usuario?',
            color: '#44ff28',
            background: '#151515',
            confirmButtonText: 'Crear nuevo usuario',
            confirmButtonColor: '#151515',
            showCancelButton: true,
            cancelButtonText: 'Vovler',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'boton',
                cancelButton: 'boton',
            }    
        }) 
        .then((result) => {
            if (result.isConfirmed) {
                crear_nuevo_usuario ();
            }  
        })

        
    } else if (usuarios[lista_nombres.indexOf (login.nombre)].pass == login.pass) {
        sessionStorage.setItem ('usuario_logeado', JSON.stringify(login.nombre));      
        location.href = 'calculadora.html';
        mensaje.innerHTML = ``;
    } else {
        mostrar_mensaje ('Contraseña incorrecta', 'Intente de nuevo por favor')
    }
})


//Generar usuario


let boton = document.querySelector ('button');
boton.addEventListener ('mouseup', ()=> {
    crear_nuevo_usuario ();
})


function crear_nuevo_usuario () {
    if (login.nombre != '' && login.nombre != undefined && login.pass != '' && login.pass != undefined) {
        if (lista_nombres.includes (login.nombre)) {
            mostrar_mensaje (`El usuario "${login.nombre}" ya existe`, 'Intente de nuevo por favor')
            } else {
            login.nombre = document.querySelector ('#usuario').value;
            login.pass = document.querySelector ('#pass').value;
            usuarios.push (login);
            lista_nombres = [];        
            for (let el of usuarios) {
                lista_nombres.push (el.nombre);
            }          
            localStorage.setItem ('usuarios', JSON.stringify(usuarios));            
            mostrar_mensaje (`Has creado satisfactoriamente tu usuario`, `Inicia sesión por favor`)    
        }
    } else {
        // alert('Inserte un nombre de usuario y contraseña')
        mostrar_mensaje (`DATOS INCOMPLETOS`, `Ingrese un nombre de usuario y contraseña para continuar`)
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
