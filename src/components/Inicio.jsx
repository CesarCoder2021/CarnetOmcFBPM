import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import ("../style/inicio.css");

const Inicio = ( ) => {
    return (
        <div>
            <div className="imgLogoInicio">
                <img src="/public/img/logo-chico-fbpm.png" alt="Logo FBPM" />
            </div>

            <h3 className="tituloPrincipal">
                Sistema de verificación de habilitaciones
            </h3>
            <Link to='/admin'>
                <Button>
                    Administrar
                </Button>
            </Link>
            <br />
            <br />
            <Link to='/buscar'>
                <Button>
                    Verificar
                </Button>
            </Link>

        </div>
    )
}

export default Inicio;