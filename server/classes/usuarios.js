class Usuarios {
    constructor(){
        this.personas=[];
    }

    addPersonas(id,nombre,sala){
        let persona={
            id,
            nombre,
            sala
        };
        this.personas.push(persona);
        return this.personas;

    }
    getPersona(id){
        let persona=this.personas.filter(per=> per.id===id)[0];
        return persona;
    }
    getPErsonas(){
        return this.personas;
    }
    getPersonasPorSala(sala){
        let personasEnSAla=this.personas.filter(persona=>persona.sala===sala);
        return personasEnSAla;
    }
    deletePersona(id){
        let perDelete=this.getPersona(id);
        this.personas=this.personas.filter(per=>per.id !=id);
        return perDelete;
    }





}


module.exports=Usuarios;