import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getMagicalGirls } from '../services/magicalGirlService';
import styles from '../css/historial.module.css';

function Historial() {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        async function fetchHistorial() {
            try {
                const magicalGirls = await getMagicalGirls();
                // Aplanar el historial de todas las chicas
                const allHistorial = magicalGirls.reduce((acc, girl) => {
                    if (girl.historialsDb && Array.isArray(girl.historialsDb)) {
                        // Para cada registro, agregamos el nombre de la chica
                        const registros = girl.historialsDb.map(record => ({
                            girlName: girl.name,
                            previussState: record.previussState,
                            newState: record.newState,
                            changeDade: record.changeDade
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

    return (
        <div className={styles.contenedor}>
            <div className={styles['titulo-tabla']}>
                <h2>Historial de Cambios</h2>
            </div>
            <DataTable
                columns={columns}
                data={historial}
                pagination
                highlightOnHover
                responsive
                noHeader
            />
        </div>
    );
}

export default Historial;
