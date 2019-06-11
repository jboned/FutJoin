import { User } from './user';


export class Partido{
    constructor(
        public _id: string,
        public tipo: number, //1-> publico, 2->privado
        public dia: Date,
        public fechaInicio: Date,
        public fechaFin: Date,
        public maxJugadores: Number,
        public creador: User,
        public campo: User,
        public jugadores: [User],
        public terminado: Number,
    ){}
}
