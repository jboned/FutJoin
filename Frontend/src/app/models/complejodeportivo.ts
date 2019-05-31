import { User } from './user';

export class ComplejoDeportivo{
  constructor(
      public _id: string,
      public direccion: string,
      public propietario: User
       //user: email, password, nombre, telefono, codigoPostal,image
  ){}
}
