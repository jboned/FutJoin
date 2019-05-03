export class User{
    constructor(
        public _id: String,
        public email: String,
        public password: String,
        public alias: String,
        public telefono: String,
        public direccion: String,
        public image: String,
        public nombre: String,
        public tipo: Number,
        public piebueno: String,
        public posicion: String,
        public altura: Number,
        public partidosJugados:Number
    ){}
}