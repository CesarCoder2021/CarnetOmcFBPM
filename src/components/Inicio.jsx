import React,{useState,useEffect} from "react";
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
                                        Verificar
                                    </Button>
                                    {
                                        bdata.map((x)=>{
                                            return <Modal className="modal" show={show} onHide={handleClose} {...props}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered style={{textAlign:'center'}}>
                                                        <ModalHeader closeButton>
                                                            <Modal.Title className="nombreModal">
                                                                <h4 className="nombreModal-funcion">{x.funcion}</h4> 
                                                            </Modal.Title>
                                                        </ModalHeader>
                                                        <Modal.Body>
                                                            <div className="modal-foto-dato">
                                                                <img className="my-2 imgPersonaModal" src={x.image} alt="foto de OMC" />
                                                                <div>
                                                                    <h4 className="modal-apellido">{x.apellido}</h4> 
                                                                    <h4 className="modal-nombre">{x.nombre}</h4>
                                                                    <h5 className="modal-dni"> DNI: {x.dni} </h5>
                                                                </div>
                                                            </div> 
                                                            <div>
                                                                {x.nivel1===true?(
                                                                                    <button className="niveles" >
                                                                                        N1{x.nivel1}
                                                                                    </button>)
                                                                                : (
                                                                                    <button className="nivelRojo" >
                                                                                        N1{x.nivel1}
                                                                                    </button>)
                                                                }
                                                                {x.nivel2===true?(
                                                                                    <button className="niveles" >
                                                                                        N2{x.nivel1}
                                                                                    </button>)
                                                                                : (
                                                                                    <button className="nivelRojo" >
                                                                                        N2{x.nivel1}
                                                                                    </button>)
                                                                }
                                                                {x.nivel3===true?(
                                                                                    <button className="niveles" >
                                                                                        N3{x.nivel1}
                                                                                    </button>)
                                                                                : (
                                                                                    <button className="nivelRojo" >
                                                                                        N3{x.nivel1}
                                                                                    </button>)
                                                                }
                                                                
                                                            </div>
                                                           
                                                           <h5 className="nivelHabilitado"> {x.description}  </h5>
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

            <div className="imgLogoInicio">
                <img className="imgLogo" src="img/logo-chico-fbpm.png" alt="Logo FBPM" />
            </div>            
 

        </div>
    )
}

export default Inicio;