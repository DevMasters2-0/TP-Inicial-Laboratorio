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
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'gabriellimiguel143@gmail.com',
                pass: 'sdsg thpy abor uxyt', //clave de aplicacion - no es la clave del gabi
            },
        });
    }

    async send(theme: string, incidencia: Incidencia) {

        let cuerpo = (theme == emailSubject.CREATE) ? emailMessage.CREATE : emailMessage.FINALIZE;

        let mailOptions = {
            from: 'gabriellimiguel143@gmail.com',
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


