import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css/forgotPassword.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Simulación de envío de correo de recuperación
            alert('Si el correo existe, se ha enviado un mensaje de recuperación.');
            navigate('/login');
        } else {
            alert('Por favor, ingresa tu correo.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <section className={styles['olvido-section']}>
                <h2>Recuperar Contraseña</h2>
                <form className={styles['olvido-form']} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className={styles['form-label']}>Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className={styles['form-control']}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles['btn-form']}>Enviar</button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link to="/login">Volver a Iniciar Sesión</Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default ForgotPassword;
