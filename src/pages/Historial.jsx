import React, { useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { getMagicalGirls } from '../services/magicalGirlService';
import styles from '../css/historial.module.css';

function Historial() {
    const [historial, setHistorial] = useState([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        async function fetchHistorial() {
            try {
                const magicalGirls = await getMagicalGirls();
                // Aplanar el historial de todas las chicas utilizando las propiedades correctas (según el JSON)
                const allHistorial = magicalGirls.reduce((acc, girl) => {
                    if (girl.HistorialsDb && Array.isArray(girl.HistorialsDb)) {
                        // Para cada registro, agregamos el nombre de la chica y usamos las propiedades con mayúscula
                        const registros = girl.HistorialsDb.map(record => ({
                            girlName: girl.Name,
                            previussState: record.PreviussState,
                            newState: record.NewState,
                            changeDade: record.ChangeDade
                        }));
                        return acc.concat(registros);
                    }
                    return acc;
                }, []);
                setHistorial(allHistorial);
            } catch (error) {
                console.error("Error al obtener el historial:", error);
            }
        }
        fetchHistorial();
    }, []);

    // Filtrar la data del historial según el término de búsqueda.
    // Se filtra por: nombre de la chica, estado anterior, nuevo estado y fecha (convertida a string).
    const filteredHistorial = historial.filter(item =>
        (item.girlName ? item.girlName.toLowerCase() : "").includes(filterText.toLowerCase()) ||
        (item.previussState ? item.previussState.toLowerCase() : "").includes(filterText.toLowerCase()) ||
        (item.newState ? item.newState.toLowerCase() : "").includes(filterText.toLowerCase()) ||
        (item.changeDade ? new Date(item.changeDade).toLocaleString().toLowerCase() : "").includes(filterText.toLowerCase())
    );

    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Chica',
            selector: row => row.girlName,
            sortable: true,
        },
        {
            name: 'Estado Anterior',
            selector: row => row.previussState,
            sortable: true,
        },
        {
            name: 'Nuevo Estado',
            selector: row => row.newState,
            sortable: true,
        },
        {
            name: 'Fecha de Cambio',
            selector: row => new Date(row.changeDade).toLocaleString(),
            sortable: true,
        }
    ];

    // Memorizar el componente del subHeader (input de búsqueda) para evitar que pierda foco en cada render
    const subHeaderComponent = useMemo(() => (
        <input
            type="text"
            placeholder="Buscar..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
    ), [filterText]);

    return (
        <div className={styles.contenedor}>
            <div className={styles['titulo-tabla']}>
                <h2>Historial de Cambios</h2>
            </div>
            <DataTable
                columns={columns}
                data={filteredHistorial}
                pagination
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={subHeaderComponent}
                noHeader
            />
        </div>
    );
}

export default Historial;
