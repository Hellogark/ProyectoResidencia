import { Usuario } from './usuario.model';
export class Proyecto {

            constructor(

                public nombre: string,
                public descripcion: string,                               
                public responsable?: string,
                public nombreEmpresa?: string,
                public ultimoEditor?: string,
                public fechaCreacion?: string,
                public fechaProyectada?: string,
                public participantes?: Usuario[],
                public archivos?: string[],
                public _id?: string

            ){

            }
}