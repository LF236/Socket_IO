require( 'colors' );
class Sockets {
    constructor( io ) {
        this.io = io;
        this.clientes = { };
        this.socketEvents();
    }

    socketEvents() {
        this.io.on( 'connection', ( socket ) => { 
            socket.on( 'mensaje-to-server', data => {
                console.log( 'Mensaje desde el cliente'.rainbow );
                console.log( data );
                // Este mensaje solo se esta emitiendo al Socket, no a todos los clientes conectodos ---> OJO
                // socket.emit( 'mensaje-from-server', data );
                // io permite enviar a todo el mundo
                this.io.emit( 'mensaje-from-server', data );
            } )
        } )
        
    }
}

module.exports = Sockets;