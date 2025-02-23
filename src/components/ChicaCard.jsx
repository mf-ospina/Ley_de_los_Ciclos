import { Link } from "react-router-dom";

function ChicaCard({ chica, index }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    {index + 1}. {chica.name}
                </h5>
                <p className="card-text">
                    Edad: {chica.age} <br />
                    Ciudad: {chica.origun_City} <br />
                    Estado: {chica.status}
                </p>
                <Link to={`/chicas/${chica.id}`} className="btn btn-primary">
                    Ver Perfil
                </Link>
            </div>
        </div>
    );
}

export default ChicaCard;
