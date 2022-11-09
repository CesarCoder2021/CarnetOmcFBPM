import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import db from '../data/firebase';
import Card from 'react-bootstrap/Card';
import "../style/buscar.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Buscar = ( ) => {

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

    return(
        <div className="buscarContainer">
            <Link to='/'>
                <Button variant="dark" className="volver">
                    ❰❰
                </Button>
            </Link>
            <div className="verificar">
                
                <label className="ingresoDni">Ingrese número de DNI</label><br />
                <input className="input" type="text" maxLength={8} value={texto} onChange={buscador} placeholder="Por ej: 12345678"/>
                    
                {
                    texto.length===8?<div>
                    {
                        bdata.length!==0?  (
                                    <div>
                                        {
                                            bdata.map((x)=>{
                                                return <Card className='card'>
                                                <Card.Img variant="top" src={x.image} />
                                                <Card.Body>
                                                    <Card.Title> {x.nombre} {x.apellido} </Card.Title>
                                                    <Card.Text>
                                                    DNI: {x.dni} <br />
                                                    Nivel: {x.description} <br />
                                                    {
                                                        x.habilitacion === true ? (
                                                            <> ✔️ <b> Está habilitado/a </b>   </>
                                                        ) : (
                                                            <> ❌ <b> No está habilitado/a </b>  </>
                                                        )
                                                    }
                                                    </Card.Text>
                                                </Card.Body>
                                                </Card>
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
        </div>
    )
}

export default Buscar;