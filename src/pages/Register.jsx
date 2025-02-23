import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css/register.module.css';

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, email, password, confirmPassword } = formData;
        if (nombre && email && password && confirmPassword) {
            if (password === confirmPassword) {
                // Simulación de registro exitoso
                navigate('/login');
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <div className={styles.contenedor}>
            <section className={styles['registro-section']}>
                <h2>Crear Cuenta</h2>
                <form className={styles['registro-form']} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className={styles['form-control']}
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles['form-control']}
                            required
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={styles['form-control']}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles['btn-form']}>Registrarse</button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register;
