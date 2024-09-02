import { Request, Response } from 'express';
import { User, getUserByUsername, getUsers } from '../models/users.models';

export const loginController = (req: Request, res: Response): void => {

    const { username, password } = req.body;

    try {
        // Buscar el usuario por nombre de usuario

        const users: User[] = getUsers();

        const user = getUserByUsername(username);

        (!user) && res.status(400).send('Usuario no encontrado');

        // Comparar la contraseña
        (!user || password !== user.password) && res.status(400).send('Contraseña incorrecta');


        // Sesión iniciada
        res.status(200).send('Sesion iniciada');

    } catch (error) {
        res.status(500).send('Error en el inicio de sesión');
    }
}
