import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMagicalGirlById } from '../services/magicalGirlService';
import styles from '../css/magicGirlProfile.module.css';

function ChicaMagicaProfile() {
    const { id } = useParams();
    const [girl, setGirl] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMagicalGirlById(id);
                setGirl(data);
            } catch (error) {
                console.error("Error al obtener la chica mágica:", error);
            }
        }
        fetchData();
    }, [id]);

    if (!girl) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <h2>Perfil de {girl.name}</h2>
            <div className={styles.details}>
                <p><strong>Edad:</strong> {girl.age}</p>
                <p><strong>Ciudad de Origen:</strong> {girl.origun_City}</p>
                <p><strong>Estado:</strong> {girl.status}</p>
                <p>
                    <strong>Fecha de Contrato:</strong>{" "}
                    {new Date(girl.contract_Date).toLocaleDateString()}
                </p>
            </div>
            {girl.historialsDb && girl.historialsDb.length > 0 && (
                <div className={styles.history}>
                    <h3>Historial de Cambios</h3>
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Estado Anterior</th>
                                <th>Nuevo Estado</th>
                                <th>Fecha de Cambio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {girl.historialsDb.map((entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.previussState}</td>
                                    <td>{entry.newState}</td>
                                    <td>{new Date(entry.changeDade).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ChicaMagicaProfile;
