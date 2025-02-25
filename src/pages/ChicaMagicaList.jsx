import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getMagicalGirls, deleteMagicalGirl } from '../services/magicalGirlService';
import styles from '../css/magicGirlsList.module.css';

function ChicaMagicaList() {
    const [chicas, setChicas] = useState([]);
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();

    // Función para obtener la data de las chicas mágicas
    const fetchChicas = async () => {
        try {
            const data = await getMagicalGirls();
            console.log("Data recibida:", data);
            // Filtrar solo los registros que tengan la propiedad "Id"
            const validData = data.filter(item => item.Id !== undefined);
            console.log("Data filtrada:", validData);
            setChicas(validData);
        } catch (error) {
            console.error('Error al obtener las chicas mágicas:', error);
        }
    };


    useEffect(() => {
        fetchChicas();
    }, []);

    // Funciones de acciones
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

    // Definición de columnas para la tabla (usando propiedades con mayúscula)
    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Nombre',
            selector: row => row.Name,
            sortable: true,
        },
        {
            name: 'Edad',
            selector: row => row.Age,
            sortable: true,
        },
        {
            name: 'Ciudad de Origen',
            selector: row => row.Origun_City,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.Status,
            sortable: true,
        },
        {
            name: 'Fecha de Contrato',
            selector: row => new Date(row.Contract_Date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Perfil',
            cell: (row) => (
                <button className="btn btn-info btn-sm" onClick={() => handleViewProfile(row.Id)}>
                    Ver Perfil
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row.Id)}>
                        Editar
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(row.Id)}
                        style={{ marginLeft: '5px' }}
                    >
                        Eliminar
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    // Filtrar la data según el término de búsqueda
    const filteredChicas = chicas.filter(chica =>
        (chica.Name ? chica.Name.toLowerCase() : '').includes(filterText.toLowerCase()) ||
        (chica.Status ? chica.Status.toLowerCase() : '').includes(filterText.toLowerCase()) ||
        (chica.Origun_City ? chica.Origun_City.toLowerCase() : '').includes(filterText.toLowerCase()) ||
        (chica.Age ? chica.Age.toLowerCase() : '').includes(filterText.toLowerCase()) ||
        (chica.Contract_Date ? chica.Contract_Date.toLowerCase() : '').includes(filterText.toLowerCase())
    );

    // Memorizar el subHeaderComponent para que no se recree en cada render y no pierda el foco
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
            <div className={styles['agregar-cliente']}>
                <h2>Listado de Chicas Mágicas</h2>
                <button
                    className={`btn ${styles['btn-agregar']}`}
                    onClick={() => navigate('/chicas/nueva')}
                >
                    Agregar Chica
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filteredChicas}
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

export default ChicaMagicaList;
