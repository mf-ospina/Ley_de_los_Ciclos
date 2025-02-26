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
                // Aplanar el historial de todas las chicas utilizando las propiedades en minúsculas
                const allHistorial = magicalGirls.reduce((acc, girl) => {
                    if (girl.historialsDb && Array.isArray(girl.historialsDb)) {
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

    const filteredHistorial = historial.filter(item =>
        String(item.girlName).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.previussState).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.newState).toLowerCase().includes(filterText.toLowerCase()) ||
        String(new Date(item.changeDade).toLocaleString()).toLowerCase().includes(filterText.toLowerCase())
    );

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
