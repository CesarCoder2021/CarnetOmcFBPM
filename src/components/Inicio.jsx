import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Inicio = ( ) => {
    return (
        <>
            <div className="imgLogoInicio">
                <img src="" alt="" />
            </div>

            <h3>
                Sistema de verificación de habilitaciones
            </h3>
            <Link to='/admin'>
                <Button>
                    Admin
                </Button>
            </Link>
            <br />
            <br />
            <Link to='/buscar'>
                <Button>
                    Árbitros
                </Button>
            </Link>

        </>
    )
}

export default Inicio;