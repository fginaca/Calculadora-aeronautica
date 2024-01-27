class Usuario {
    constructor (nombre,pass) {
        this.nombre = nombre;
        this.pass = pass;
    }
}


let usuarios = [];
let lista_nombres = [];
let login = new Usuario ();
let datos_ventana_login;
// let usuario;
// let pass;


// Traigo del local el array de usuarios y lo guardo en 'usuarios'.

if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse (localStorage.getItem('usuarios'));
    // console.log('se descargo lista de usuarios')
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
        sessionStorage.setItem ('usuario_logeado', JSON.stringify(login));        
        location.href = 'calculadora.html';
        mensaje.innerHTML = ``;
    } else {
        Swal.fire({
            title: 'Contraseña incorrecta',
            text: 'intente de nuevo por favor',
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
})


//Generar usuario


let boton = document.querySelector ('button');
boton.addEventListener ('mouseup', ()=> {
    crear_nuevo_usuario ();
})

console.table(usuarios)



function crear_nuevo_usuario () {
    if (login.nombre != '' && login.nombre != undefined && login.pass != '' && login.pass != undefined) {
        if (lista_nombres.includes (login.nombre)) {
            Swal.fire({
                title: `El usuario "${login.nombre}" ya existe`,
                text: 'Intente de nuevo por favor',
                // icon: 'error',
                color: '#44ff28',
                background: '#151515',
                // showConfirmButton: false,
                confirmButtonText: 'Volver',
                confirmButtonColor: '#151515',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'boton',
                }    
            })
        } else {
            login.nombre = document.querySelector ('#usuario').value;
            login.pass = document.querySelector ('#pass').value;
            usuarios.push (login);
            lista_nombres = [];        
            for (let el of usuarios) {
                lista_nombres.push (el.nombre);
            }          
            localStorage.setItem ('usuarios', JSON.stringify(usuarios));            
            Swal.fire({
                title: `Has creado satisfactoriamente tu usuario`,
                text: 'Inicia sesión por favor',
                // icon: 'error',
                color: '#44ff28',
                background: '#151515',
                // showConfirmButton: false,
                confirmButtonText: 'Volver',
                confirmButtonColor: '#151515',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'boton',
                }    
            })      
        }
    } else {
        // alert('Inserte un nombre de usuario y contraseña')
        mensaje.innerHTML = `Inserte un nombre de usuario y/o contraseña`;
        mensaje.className = 'alerta';
    }
}

