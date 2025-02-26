import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMagicalGirlById, createMagicalGirl, updateMagicalGirl } from '../services/magicalGirlService';
import styles from '../css/chicaMagicaForm.module.css';

function ChicaMagicaForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado inicial para el formulario
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        origun_City: '',
        status: '',
        contract_Date: ''
    });

    // Si se está editando, obtener la data de la chica mágica
    useEffect(() => {
        if (id) {
            async function fetchData() {
                try {
                    const data = await getMagicalGirlById(id);
                    // Suponemos que contract_Date viene en formato ISO y el input type="date" acepta YYYY-MM-DD
                    setFormData({
                        name: data.name || '',
                        age: data.age || '',
                        origun_City: data.origun_City || '',
                        status: data.status || '',
                        contract_Date: data.contract_Date ? data.contract_Date.split('T')[0] : ''
                    });
                } catch (error) {
                    console.error('Error al obtener la chica mágica:', error);
                }
            }
            fetchData();
        }
    }, [id]);

    // Manejar cambios en los inputs y select
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Modo edición
                await updateMagicalGirl(id, formData);
            } else {
                // Modo creación
                await createMagicalGirl(formData);
            }
            navigate('/chicas');
        } catch (error) {
            console.error('Error al guardar la información:', error);
            alert('Error al guardar los datos.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <h2>{id ? 'Editar' : 'Agregar'} Chica Mágica</h2>
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Edad</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="origun_City">Ciudad de Origen</label>
                    <input
                        type="text"
                        id="origun_City"
                        name="origun_City"
                        value={formData.origun_City}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="status">Estado</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Activa">Activa – La chica mágica sigue luchando contra las brujas.</option>
                        <option value="Desaparecida">Desaparecida – Se desconoce su paradero o no hay información reciente sobre ella.</option>
                        <option value="Rescatada por la Ley de los Ciclos">Rescatada por la Ley de los Ciclos – Ha sido salvada antes de caer en la desesperación y convertirse en bruja.</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="contract_Date">Fecha de Contrato</label>
                    <input
                        type="date"
                        id="contract_Date"
                        name="contract_Date"
                        value={formData.contract_Date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className={styles.btnForm}>
                    {id ? 'Actualizar' : 'Guardar'}
                </button>
            </form>
        </div>
    );
}

export default ChicaMagicaForm;
