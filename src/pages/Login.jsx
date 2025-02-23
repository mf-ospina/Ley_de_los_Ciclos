import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css/login.module.css';

function Login({ setIsLoggedIn }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        if (email && password) {
            // Simulación de login exitoso:
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);  // Actualiza el estado en App.jsx
            navigate('/chicas');
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <section className={styles['login-section']}>
                <h2>Iniciar Sesión</h2>
                <form className={styles['login-form']} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles['form-control']}
                            required
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles['form-control']}
                            required
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles['btn-form']}>Iniciar Sesión</button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link to="/register">Regístrate</Link> |{' '}
                        <Link to="/forgot-password">¿Olvidaste tu Contraseña?</Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;
