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

const users: Array<User> = [
  {
    id: 1,
    username: 'johndoe',
    password: '123456',
    nombre: 'John',
    apellido: 'Doe',
    imagenDePerfil: 'https://example.com/profile/johndoe.jpg', // URL de ejemplo
    fechaDeCreacion: new Date(), // Fecha de creación actual
    role: Role.ADMIN, // Rol del usuario
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'secret',
    nombre: 'Jane',
    apellido: 'Doe',
    imagenDePerfil: 'https://example.com/profile/janedoe.jpg', // URL de ejemplo
    fechaDeCreacion: new Date(), // Fecha de creación actual
    role: Role.ADMIN, // Rol del usuario
  },
  {
    id: 3,
    username: 'jackdoe',
    password: 'password',
    nombre: 'Jack',
    apellido: 'Doe',
    imagenDePerfil: 'https://example.com/profile/jackdoe.jpg', // URL de ejemplo
    fechaDeCreacion: new Date(), // Fecha de creación actual
    role: Role.ADMIN, // Rol del usuario
  },
];


export const getUsers = (): Array<User> => {
  return users;
};

export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

export const createUser = (user: User): void => {
  users.push(user);
};

export const updateUser = (user: User): void => {
  const index = users.findIndex(u => u.id === user.id);
  users[index] = user;
};

export const deleteUser = (id: number): void => {
  const index = users.findIndex(u => u.id === id);
  users.splice(index, 1);
};

export const createUserDB = (user: User): User => {

  const UserCreated: User = {
    ...user,
  };
  UserCreated.fechaDeCreacion = new Date();
  return UserCreated;
}