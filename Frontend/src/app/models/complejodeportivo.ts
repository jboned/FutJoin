import { User } from './user';

export class ComplejoDeportivo{
  constructor(
      public _id: String,
      public direccion: String,
      public propietario: User
       //user: email, password, nombre, telefono, codigoPostal,image
  ){}
}
