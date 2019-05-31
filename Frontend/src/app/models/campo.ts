import { ComplejoDeportivo } from './complejodeportivo';

export class Campo{
  constructor(
      public _id: string,
      public nombre: string,
      public tipo: number,
      public largo: number,
      public ancho: number,
      public superficie: string,
      public aforoGrada: number,
      public sistemaIluminacion: boolean,
      public complejo: ComplejoDeportivo,
      public image: string,

  ){}
}
