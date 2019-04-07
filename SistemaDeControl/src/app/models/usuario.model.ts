export class Usuario {

    constructor(
        public nombre: string,
        public correo: string,
        public password: string ,
        public empresa?: string,
        public fechaCreacion?: string,
        public img?: string,
        public activo?: boolean,
        public role?: string,                      
        public proyectos?: string[],
        public passwordAnterior?: string,
        public _id?: string
        ){

    }

}