import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import ("../style/inicio.css");

const Inicio = ( ) => {
    return (
        <div className="portadaInicial">
            <div className="imgLogoInicio">
                <img className="imgLogo" src="img/logo-chico-fbpm.png" alt="Logo FBPM" />
            </div>

            <h3 className="tituloPrincipal">
                Sistema de verificación de habilitaciones
            </h3>
            <div className="botonesInicio">
                <Link to='/admin'>
                    <Button className="botonAdmin">
                        Administrar
                    </Button>
                </Link>
                <Link to='/buscar'>
                    <Button className="botonVerificar">
                        Verificar
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default Inicio;