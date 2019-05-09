export class User{
    constructor(
        public _id: String,
        public email: String,
        public password: String,
        public confirmPassword: String,
        public nombre: String,

        //No obligatorios
        public telefono: String,
        public image: String,

        //Datos futbolísticos
        public piebueno: String,
        public posicion: String,
        public altura: Number,
        public partidosJugados:Number
    ){}

}
