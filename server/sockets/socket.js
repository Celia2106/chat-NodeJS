const { io } = require('../server');
const Usuarios=require('../classes/usuarios');
const {crearMensaje}=require('../utilidades/utilidades');
const usuarios=new Usuarios();
io.on('connection', (client) => {

    client.on('entrarChat',(data,callback)=>{

        if(!data.nombre || !data.sala){
            callback({
                error:true,
                mensaje:'EL nombre y la sala es requeridoo'
            })
        }
        client.join(data.sala);
        let personas=usuarios.addPersonas(client.id,data.nombre,data.sala);
        client.broadcast.to(data.sala).emit('crearMensaje',crearMensaje('Administrador',`${data.nombre} entro al chat`));

        client.broadcast.to(data.sala).emit('listaPersona',usuarios.getPersonasPorSala(data.sala));


        callback(usuarios.getPersonasPorSala(data.sala));

        return personas;
    });
    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });



    client.on('disconnect',()=>{
        let personaBOrrada=usuarios.deletePersona(client.id);

        client.broadcast.to(personaBOrrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBOrrada.nombre} abandono el chat`));
        client.broadcast.to(personaBOrrada.sala).emit('listaPersona',usuarios.getPersonasPorSala(personaBOrrada.sala));
    });

    client.on('mensajePrivado',data=>{
        let persona=usuarios.getPersona(client.id);
        //data.para==id persona a la que se qquiere enviar
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    })
});