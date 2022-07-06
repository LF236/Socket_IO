const express = require( 'express' );
const http = require( 'http' );
const socketio = require( 'socket.io' );
const path = require( 'path' );
const Sockets = require('./socket');
const cors = require( 'cors' );
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuración de sockets
        this.io = socketio( this.server, { /* Add config */ } )
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        // CORS
        this.app.use( cors() );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {
        // Inicializar los middlewares
        this.middlewares();

        // Configurar Sockets
        this.configurarSockets();

        // Inicializar el servidor
        this.server.listen( this.port, () => {
            console.log( `Servidor listo en http://localhost:${ this.port }` );
        } )
    }

}

module.exports = Server;