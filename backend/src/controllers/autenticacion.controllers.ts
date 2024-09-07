import { Request, Response } from 'express';
import { User, createUserDB } from '../models/users.models';
import { validateUser } from '../utils/validations/users.validations';
import db from '../database/connection';


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


