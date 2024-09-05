import { Request, Response } from 'express';
import { User, createUserDB, getUserByUsername, getUsers } from '../models/users.models';
import { validateUser } from '../utils/validations/users.validations';
import db from '../database/connection';
import { equalsHash } from '../utils/validations/hashing';
/** 
export const loginControllerV2 = (req: Request, res: Response): void => {

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
}*/

export async function loginController(req: Request, res: Response) {
    const user = req.body;
    let createdUser = createUserDB(user);

    try {
        let user = await db.getUser(createdUser);
        res.status(200).json({user});
    } catch (error) {
        res.status(404).send("usuario no encontrado");
    }
   
   
}

export function createController(req: Request, res: Response) {
    const user = req.body;
    let createdUser = createUserDB(user);

    validateUser(req, res, async () => {
        try {
            await db.createAdmin(createdUser);
            res.status(200).send('admin creado con exito');
        } catch (err) {
            res.status(400).send('Error al crear el admin, bad request');
        }
        
    });
}


