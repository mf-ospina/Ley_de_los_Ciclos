export default function Footer() {
    return (
        <footer className="pie-pagina">
            <p className="text-lg">
                &copy; {new Date().getFullYear()} Chicas Mágicas. Todos los derechos reservados.
            </p>
            <nav className="mt-2">
                <a href="/privacidad" className="text-pink-300 hover:text-yellow-400 mx-2">
                    Política de Privacidad
                </a>
                |
                <a href="/terminos" className="text-pink-300 hover:text-yellow-400 mx-2">
                    Términos y Condiciones
                </a>
            </nav>
        </footer>
    );
}
