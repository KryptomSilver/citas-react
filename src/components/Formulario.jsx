import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({ crearCita }) => {
    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        dueño: "",
        fecha: "",
        hora: "",
        sintomas: "",
    });

    // crear state de alertas
    const [error, actualizarError] = useState(false);
    // Funcion que se ejecuta cada ves que un usuario cambia informacion de un input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value,
        });
    };
    // Extraer valores
    const { mascota, dueño, fecha, hora, sintomas } = cita;
    //Cuando el usario presiona agragar cita

    const submitCita = (e) => {
        e.preventDefault();
        // validar
        if (
            mascota.trim() === "" ||
            dueño.trim() === "" ||
            fecha.trim() === "" ||
            hora.trim() === "" ||
            sintomas.trim() === ""
        ) {
            actualizarError(true);
            return;
        }
        // eliminar el mensaje previo
        actualizarError(false);
        //asignar id
        cita.id = uuidv4();

        //crear la cita
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota: "",
            dueño: "",
            fecha: "",
            hora: "",
            sintomas: "",
        });
    };
    return (
        <Fragment>
            <h2>Agregar cita</h2>
            {error ? (
                <p className="alerta-error">
                    Todos los campos son obligatorios
                </p>
            ) : null}
            <form onSubmit={submitCita}>
                <label htmlFor="">Nombre mascota:</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label htmlFor="">Nombre del dueño:</label>
                <input
                    type="text"
                    name="dueño"
                    className="u-full-width"
                    placeholder="Nombre dueño mascota"
                    onChange={actualizarState}
                    value={dueño}
                />

                <label htmlFor="">Fecha:</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label htmlFor="">Hora:</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label htmlFor="">Sintomas:</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button type="submit" className="u-full-width button-primary">
                    Agragar cita
                </button>
            </form>
        </Fragment>
    );
};

export default Formulario;
