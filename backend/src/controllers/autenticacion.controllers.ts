import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response): void => {

    const { username, password } = req.body;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Usuario no encontrado');

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Contraseña incorrecta');

        // Crear y asignar un token JWT
        const token = jwt.sign({ id: user._id, username: user.username }, 'secret_key', { expiresIn: '1h' });
        res.header('auth-token', token).send({ token });

    } catch (error) {
        res.status(500).send('Error en el inicio de sesión');
    }
});
};