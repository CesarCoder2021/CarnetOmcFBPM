import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import db from '../data/firebase';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../style/buscar.css";

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
        
        <div className="verificar">
            <form>
                <label className="ingresoDni">Ingrese número de DNI</label><br />
                <input type="text" value={texto} onChange={buscador} placeholder="Por ej: 20600100"/>
                <Button className="mx-1">  🔍 </Button>
            </form>
            
            
            {
                texto.length===8?<div>
                {
                    bdata.length!==0?  (
                                <div>
                                    {
                                        bdata.map((x)=>{
                                            return <Card style={{ width: '14rem' }}>
                                            <Card.Img variant="top" src={x.image} />
                                            <Card.Body>
                                                <Card.Title> {x.nombre} {x.apellido} </Card.Title>
                                                <Card.Text>
                                                DNI: {x.dni} <br />
                                                Nivel: {x.description} <br />
                                                {
                                                    x.habilitacion === true ? (
                                                        <p> ✔️ <b> Está habilitado/a </b>   </p>
                                                    ) : (
                                                        <p> ❌ <b> No está habilitado/a </b>  </p>
                                                    )
                                                }
                                                </Card.Text>
                                            </Card.Body>
                                            </Card>
                                        })
                                    }
                                </div>
                            ):(
                                <h4>No hay coincidencias con "{texto}" </h4>
                            )
                }               </div> 
                : <div> </div>        
            } 
            <Link to='/'>
                    <Button className="botonVolver">
                        Nueva Verificación
                    </Button>
            </Link>
        </div>
    )
}

export default Buscar;