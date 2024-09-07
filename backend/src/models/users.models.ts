export enum Role {
  ADMIN = 'Admin',
}

export interface User {
  id: number | null;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  imagenDePerfil: string | null; // URL o ruta de la imagen de perfil
  fechaDeCreacion: Date; // Fecha de creación, se genera automáticamente
  role: Role | null; // Campo para el rol del usuario
}

export const createUserDB = (user: User): User => {

  const UserCreated: User = {
    ...user,
  };
  UserCreated.fechaDeCreacion = new Date();
  return UserCreated;
}