import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getMagicalGirls, deleteMagicalGirl } from '../services/magicalGirlService';
import styles from '../css/magicGirlsList.module.css';

function ChicaMagicaList() {
    const [chicas, setChicas] = useState([]);
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();

    // Función para obtener la data
    const fetchChicas = async () => {
        try {
            const data = await getMagicalGirls();
            setChicas(data);
        } catch (error) {
            console.error('Error al obtener las chicas mágicas:', error);
        }
    };

    useEffect(() => {
        fetchChicas();
    }, []);

    const handleEdit = (id) => {
        navigate(`/chicas/editar/${id}`);
    };

    const handleViewProfile = (id) => {
        navigate(`/chicas/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta chica mágica?')) {
            try {
                await deleteMagicalGirl(id);
                fetchChicas();
            } catch (error) {
                console.error('Error eliminando la chica:', error);
            }
        }
    };
    
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

    // Definición de columnas para la tabla
    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Edad',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Ciudad de Origen',
            selector: row => row.origun_City,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Fecha de Contrato',
            selector: row => new Date(row.contract_Date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Perfil',
            cell: (row) => (
                <button className={styles["btn"] + " " + styles["btn-ver"]} onClick={() => handleViewProfile(row.Id)}>
                    Ver
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
               <button className={styles["btn"] + " " + styles["btn-editar"]} onClick={() => handleEdit(row.Id)}>
                        Editar
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: '',     
            cell: (row) => (
                <button className={styles["btn"] + " " + styles["btn-eliminar"]} onClick={() => handleDelete(row.Id)}>
                        Eliminar
                </button>

            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Filtrar la data según el término de búsqueda
    const filteredChicas = chicas.filter(chica =>
        chica.name.toLowerCase().includes(filterText.toLowerCase()) ||
        chica.status.toLowerCase().includes(filterText.toLowerCase()) ||
        chica.origun_City.toLowerCase().includes(filterText.toLowerCase())
    );

    // Componente para el subHeader (filtro global)
    const SubHeaderComponent = () => {
        return (
            <input
                type="text"
                placeholder="Buscar..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                style={{ marginRight: '10px', padding: '8px', width: '200px' }}
            />
        );
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles['agregar-cliente']}>
                <h2>Listado de Chicas Mágicas</h2>
                <button
                    className={`btn ${styles['btn-agregar']}`}
                    onClick={() => navigate('/chicas/nueva')}
                >
                    Agregar chica
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filteredChicas}
                pagination
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={<SubHeaderComponent />}
                noHeader
                customStyles={customStyles}
            />
        </div>
    );
}

export default ChicaMagicaList;
