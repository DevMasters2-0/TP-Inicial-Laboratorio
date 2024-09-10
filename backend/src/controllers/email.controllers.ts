import nodemailer, { Transport, Transporter } from 'nodemailer';
import { Incidencia } from '../models/incidencias.models';

export enum emailMessage {

    CREATE = 'se ha creado la incidencia con exito. Muchas gracias por utilizar nuestros servicios.',
    FINALIZE = 'la incidencia ha sido resuelta con exito'

}

export enum emailSubject {
    CREATE = 'Creacion de incidencia',
    FINALIZE = 'Incidencia terminada con exito'
}

class EmailController {
    private transporter: Transporter;


    constructor() {

        this.transporter = nodemailer.createTransport({
            service: "Amazon SES",
            host: process.env.EMAIL_SMTP_SERVER,
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_SMTP_USER,
                pass: process.env.EMAIL_SMTP_PASSWORD, //clave de aplicacion - no es la clave del gabi

            },
        });
    }

    async send(theme: string, incidencia: Incidencia) {

        let cuerpo = (theme == emailSubject.CREATE) ? emailMessage.CREATE : emailMessage.FINALIZE;

        let mailOptions = {
            from: 'nms@loge.ar',
            to: incidencia?.email,
            subject: theme,
            text: cuerpo + "\n" + this.showdata(incidencia)
        };

        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Mail enviado con exito");
            }
        });
    };

    private showdata(incidencia: Incidencia) {
        return `Nombre: ${incidencia.nombre}\nDNI: ${incidencia.dni}\nEmail: ${incidencia.email}\nTema: ${incidencia.tema}\nNivel de Riesgo: ${incidencia.nivelDeRiesgo}\nLocalidad: ${incidencia.localidad}\nDescripción: ${incidencia.descripcion}\nFecha de Creación: ${incidencia.fechaDeCreacion}\nEstado: ${incidencia.estado}`;
    }
}

const emailController = new EmailController();

export default emailController;


