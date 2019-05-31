export class User{
    constructor(
        public _id: string,
        public email: string,
        public password: string,
        public confirmPassword: string,
        public nombre: string,

        //No obligatorios
        public telefono: string,
        public image: string,
        public tipo: number,
        public fecha: string,
        public codigoPostal: string,
        
        //Datos futbolísticos
        public piebueno: string,
        public posicion: string,
        public altura: number,
        public partidosJugados:number
    ){}

}
