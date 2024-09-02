export default function(incidencia){
    const riesgo = incidencia.nivelDeRiesgo | "alto";
    let puntaje = 1;
    switch (riesgo){
        case "alto":
            puntaje = 1
            break
        case "moderado":
            puntaje = 0.5
            break
        case "bajo":
            puntaje = 0.3
    }
    return puntaje;
}