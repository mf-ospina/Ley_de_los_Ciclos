import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn = false }) {
    return (
        <header className="menu">
            <div className="logo">
                <h1 className="leyciclos">Ley <span>de los Ciclos</span></h1>
            </div>
            <nav className="opc-menu navbar navbar-expand-lg" aria-label="Menú principal">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chicas">Chicas Mágicas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/historial">Historial</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="#sobre-nosotros">Sobre Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contacto">Contáctanos</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="carrito">
            </div>
        </header>
    );
}

export default Navbar;
