import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, ModalHeader } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { collection, getDocs } from 'firebase/firestore';
import db from '../data/firebase';
import '../style/inicio.css';



const Inicio = ( props ) => {

    const [texto, setTexto] = useState([])

    const buscador = ( {target} ) => {
        setTexto(target.value)
    }
    
    const [arbitro, setArbitro] = useState([])
    const buscarArbitro=async()=>{
        try{
            const document = collection(db,"fichas-omc")
            const col = await getDocs(document)
            const result = col.docs.map((doc)=> doc={id:doc.id,...doc.data()})
            setArbitro(result)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        buscarArbitro()
    },[])

    const bdata = arbitro.filter(x=>x.dni.toLowerCase().includes(texto.toString().toLowerCase()))

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="portadaInicial">
            <div className="imgLogoInicio">
                <img className="imgLogo" src="img/logo-chico-fbpm.png" alt="Logo FBPM" />
            </div>

            <h3 className="tituloPrincipal">
                Sistema de verificación de habilitaciones
            </h3>
            <div className="botonesInicio">
                <label className="ingresoDni">Ingrese número de DNI</label><br />
                <input className="input" type="text" maxLength={8} value={texto} onChange={buscador} placeholder="Por ej: 12345678"/>
            </div>
            
            {
                    texto.length===8?<div>
                    {
                        bdata.length?  (
                                <div>
                                  <Button className="botonVerificar" onClick={handleShow}>
                                        Ver
                                    </Button>
                                    {
                                        bdata.map((x)=>{
                                            return <Modal show={show} onHide={handleClose} {...props}
                                            size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered style={{textAlign:'center'}}>
                                                        <ModalHeader closeButton >
                                                            <Modal.Title>
                                                                {x.apellido} {x.nombre}
                                                            </Modal.Title>
                                                        </ModalHeader>
                                                        <Modal.Body>
                                                           <img className="my-2 imgPersonaModal" src={x.image} alt="" />
                                                           <h5> DNI: {x.dni} </h5> 
                                                           <h5> {x.description}  </h5>
                                                           {
                                                                x.habilitacion === true ? (
                                                                    <h5> ✔️ <b> Está habilitado/a </b>   </h5>
                                                                ) : (
                                                                    <h5> ❌ <b> No está habilitado/a </b>  </h5>
                                                                )
                                                            }
                                                            <img src="img/logo-chico-fbpm.png" alt="Logo FBPM" className="my-2" />
                                                        </Modal.Body>
                                                        
                                                    </Modal>
                                        })
                                    }
                                </div>
                                ):(
                                    <h4 className="ceroResultados">No hay coincidencias con "{texto}" </h4>
                                )
                    }               </div> 
                    : <div> </div>        
                } 

        </div>
    )
}

export default Inicio;