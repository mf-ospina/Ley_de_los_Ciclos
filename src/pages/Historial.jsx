import React, { useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { getMagicalGirls } from '../services/magicalGirlService';
import styles from '../css/historial.module.css'; 
import { useNavigate } from 'react-router-dom';

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

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: "var(--primary-color)", // Fondo del encabezado
            color: "var(--secondary-color)", // Color del texto
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center"
          },
        },
        rows: {
          style: {
            backgroundColor: "#2A3050", // Fondo de las filas
            color: "var(--secondary-color)",
            fontSize: "14px",
            minHeight: "45px",
          },
        },
        subHeader: {
            style: {
                backgroundColor: "var(--primary-color)", // Fondo oscuro para el área del filtro
                padding: "10px",
            },
        },
        cells: {
          style: {
            padding: "10px", // Espaciado interno
            borderBottom: "1px solid #999999", // Borde entre filas
          },
        },
        pagination: {
            style: {
              backgroundColor: "var(--primary-color)", // Fondo oscuro para la paginación
              color: "var(--secondary-color)",
            },
            pageButtonsStyle: {
                backgroundColor: "var(--primary-color)",
                color: "white",     
                transition: "background-color 0.3s",
                "&:hover": {
                    backgroundColor: "var(--secondary-color)", 
                },
                "&:disabled": {
                    backgroundColor: "#444", // Color gris para botones deshabilitados
                    color: "var(--secondary-color)",
                },
            },
          },
          noData: {
            style: {
              backgroundColor: "var(--primary-color)",
              color: "var(--secondary-color)",
            },
          },
      };

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
                customStyles={customStyles}
            />
        </div>
    );
}

export default Historial;
