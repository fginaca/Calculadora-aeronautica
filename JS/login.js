class Usuario {
    constructor (nombre,pass) {
        this.nombre = nombre;
        this.pass = pass;
    }
}


let usuarios = [];
let lista_nombres = [];
let login = new Usuario ();
// let usuario;
// let pass;


// Traigo del local el array de usuarios y lo guardo en 'usuarios'.

if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse (localStorage.getItem('usuarios'));
    console.log('se descargo lista de usuarios')
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
        // alert('Usuario inexistente');
        mensaje.innerHTML = `El usuario "${login.nombre}" no existe`;
        mensaje.className = 'alerta';
        
    } else if (usuarios[lista_nombres.indexOf (login.nombre)].pass == login.pass) {
        sessionStorage.setItem ('usuario_logeado', JSON.stringify(login));        
        location.href = 'calculadora.html';
        mensaje.innerHTML = ``;
    } else {
        // alert('Contraseña incorrecta');
        mensaje.innerHTML = `Contraseña incorrecta`;
        mensaje.className = 'alerta';
    }
})


//Generar usuario


let boton = document.querySelector ('button');
// boton.classList.add ('boton');
// boton.id = 'crear_usuario';
// boton.innerText = 'Crear usuario nuevo';
boton.addEventListener ('mouseup', ()=> {
    if (login.nombre != '' && login.nombre != undefined && login.pass != '' && login.pass != undefined) {
        if (lista_nombres.includes (login.nombre)) {
            // alert ('El usuario ingresado ya existe')
            mensaje.innerHTML = `El usuario "${login.nombre}" ya existe`;
            mensaje.className = 'alerta';
        } else {
            login.nombre = document.querySelector ('#usuario').value;
            login.pass = document.querySelector ('#pass').value;
            usuarios.push (login);
            lista_nombres = [];
            
            for (let el of usuarios) {
                lista_nombres.push (el.nombre);
            }
            
            localStorage.setItem ('usuarios', JSON.stringify(usuarios));
            // alert ('Has creado satisfactoriamente tu usuario.');
            // let body = document.querySelector ('body');
            // body.append (boton);
            mensaje.innerHTML = `Has creado satisfactoriamente tu usuario`;
            mensaje.className = 'ok';
            
        }
    } else {
        // alert('Inserte un nombre de usuario y contraseña')
        mensaje.innerHTML = `Inserte un nombre de usuario y/o contraseña`;
        mensaje.className = 'alerta';
    }
})

console.table(usuarios)
//form.addEventListener ('submit', (e) => {})


