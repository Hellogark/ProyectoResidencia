import { Usuario } from './usuario.model';
import { Proyecto } from './proyectos.model';
export class Tareas {

            constructor(
                public proyecto: Proyecto,
                public nombreTarea?: string,
                public descTarea?: string,
                public creador?: string,
                public finalizado?: boolean,
                public ultimoEditor?: string,
                public fechaCreacion?: string,
                public fechaFinalizado?: string,
                public participantes?: Usuario[],
                public _id?: string

            ){

            }
}