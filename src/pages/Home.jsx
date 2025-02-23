function Home() {
    return (
        <div className="contenedor">
            {/* Hero Section */}
            <main className="cont-principal">
                <article className="info-principal">
                    <p>¿Estás lista para cambiar el destino?</p>
                    <h2>Descubre el poder de la esperanza</h2>
                    <p>
                        Únete a la lucha contra la oscuridad y evita que la desesperación transforme a las chicas mágicas.
                    </p>
                    <button className="btn-vermas">Ver más</button>
                </article>
                <article className="img-principal">
                    {/* La imagen se define en CSS (background-image) */}
                </article>
            </main>
            {/* Sección Sobre Nosotros */}
            <section className="sobre-nosotros" id="sobre-nosotros">
                <h2>Sobre la Ley de los Ciclos</h2>
                <p>
                    La Ley de los Ciclos se encarga de rescatar a las chicas mágicas antes de que caigan en la desesperación y se conviertan en brujas.
                    Nuestro compromiso es intervenir a tiempo para preservar la esperanza y el futuro.
                </p>
            </section>
            {/* Sección de Contacto */}
            <section className="cont-secundario">
                <article className="img-secundaria">
                    {/* Imagen secundaria definida en CSS */}
                </article>
                <article className="form-contacto" id="contacto">
                    <h2>Mantente Alerta</h2>
                    <form>
                        <div>
                            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                            <input type="text" id="nombre" className="form-control" />
                        </div>
                        <div>
                            <label htmlFor="correo" className="form-label">Correo de Contacto</label>
                            <input type="email" id="correo" className="form-control" />
                        </div>
                        <button type="submit" className="btn-form">Enviar</button>
                    </form>
                </article>
            </section>
        </div>
    );
}

export default Home;
