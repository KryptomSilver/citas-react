import { Fragment, useEffect, useState } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {
    // citas en local storage
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (!citasIniciales) {
        citasIniciales = [];
    }
    // arreglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);
    // Use Effect para realizar operaciones cuando el state cambia
    useEffect(() => {
        if (citasIniciales) {
            localStorage.setItem("citas", JSON.stringify(citas));
        } else {
            localStorage.setItem("citas", JSON.stringify([]));
        }
    }, [citas,citasIniciales]);
    //Funcion que tome las citas actuales y agregue la nueva
    const crearCita = (cita) => {
        guardarCitas([...citas, cita]);
    };
    //Funcion que elimina una cita por su id
    const eliminarCita = (id) => {
        const nuevasCitas = citas.filter((cita) => cita.id !== id);
        guardarCitas(nuevasCitas);
    };
    //Mostrar mensaje
    const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
    return (
        <div>
            <Fragment>
                <h1>Administrador de pacientes</h1>
                <div className="container">
                    <div className="row">
                        <div className="one-half column">
                            <Formulario crearCita={crearCita} />
                        </div>
                        <div className="one-half column">
                            <h2>{titulo}</h2>
                            {citas.map((cita) => (
                                <Cita
                                    key={cita.id}
                                    cita={cita}
                                    eliminarCita={eliminarCita}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    );
}


export default App;
