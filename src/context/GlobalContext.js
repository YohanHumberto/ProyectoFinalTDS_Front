import React, { createContext, useState } from 'react';
import usePartido from '../hooks/usePartido';
import useCandidatura from '../hooks/useCandidatura';
import useCandidato from '../hooks/useCandidato';
import useElecciones from '../hooks/useElecciones';
import useCargosElectorales from '../hooks/useCargosElectorales';
// import useAlert from '../hooks/useAlert';

const DataContext = createContext();

function GlobalContext({ children }) {

    const [loading, setLoading] = useState(false);

    const { partidos, cargarPartidos, agregarPartido, editarPartido, eliminarPartido } = usePartido(setLoading);
    const { candidaturas, cargarCandidaturas, agregarCandidatura, editarCandidatura, eliminarCandidatura } = useCandidatura(setLoading);
    const { candidatos, cargarCandidatos, agregarCandidato, editarCandidato, eliminarCandidato } = useCandidato(setLoading);
    const { elecciones, cargarElecciones, agregarEleccion, asignarCandidatura } = useElecciones(setLoading);
    const { cargosElectorales, cargarCargosElectorales, obtenerCargosElectoralesPorId } = useCargosElectorales(setLoading);

    const data = {
        loading,
        partidos, cargarPartidos, agregarPartido, editarPartido, eliminarPartido,
        candidaturas, cargarCandidaturas, agregarCandidatura, editarCandidatura, eliminarCandidatura,
        candidatos, cargarCandidatos, agregarCandidato, editarCandidato, eliminarCandidato,
        elecciones, cargarElecciones, agregarEleccion, asignarCandidatura,
        cargosElectorales, cargarCargosElectorales, obtenerCargosElectoralesPorId
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext };
export default GlobalContext;