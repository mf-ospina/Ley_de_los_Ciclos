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
                // Asegúrate de que el objeto "data" tenga las propiedades con mayúsculas según el JSON
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
            <h2>Perfil de {girl.Name}</h2>
            <div className={styles.details}>
                <p><strong>Edad:</strong> {girl.Age}</p>
                <p><strong>Ciudad de Origen:</strong> {girl.Origun_City}</p>
                <p><strong>Estado:</strong> {girl.Status}</p>
                <p>
                    <strong>Fecha de Contrato:</strong>{" "}
                    {new Date(girl.Contract_Date).toLocaleDateString()}
                </p>
            </div>
            {girl.HistorialsDb && girl.HistorialsDb.length > 0 && (
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
                            {girl.HistorialsDb.map((entry, index) => (
                                <tr key={entry.Id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.PreviussState}</td>
                                    <td>{entry.NewState}</td>
                                    <td>{new Date(entry.ChangeDade).toLocaleString()}</td>
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
