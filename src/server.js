import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js'
import {Server} from 'socket.io';

const app = express();
const httpServer = app.listen(80,()=> console.log("Escuchando en puerto 8080"));

const io = new Server(httpServer);

const message = [];

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/',viewRouter);

io.on('connection', (socket) => {
        console.log("Nuevo cliente conectado");

        socket.broadcast.emit('newUser', '¡Nuevo usuario conectado!');
        socket.on('message',data => { //Nota cómo 
            message.push(data)
/*             console.log(message); */
            io.emit('messageLogs',message)
        })
    }
);
