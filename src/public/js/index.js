const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title:"Identifícate",
    input:"text",
    text:"Ingrese el usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick:false
}).then(result => {
    user=result.value;  
    console.log("El usuario ingresado fue", user);
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key==="Enter") {
        if(chatBox.value.trim().length >0){ //Corroboramos que el mensaje no esté vacío o sólo contenga espacios
            socket.emit("message",{user:user,message:chatBox.value}); //Emitimos nuestro primer evento.
            chatBox.value="";
        }
    }
});

/* SOCKET LISTENERS */

socket.on('messageLogs',data => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
});

socket.on ('newUser', (data) => {
    Swal.fire({
        title: '¡Nuevo usuario conectado!',
        //title: `El usuario ${data} se ha unido al chat`, 
        toast: true,
        position: 'top-right',
    });
});