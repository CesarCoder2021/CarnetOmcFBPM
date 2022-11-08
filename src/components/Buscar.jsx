import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import db from '../data/firebase';
import Card from 'react-bootstrap/Card';

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
        <>
            <label>Ingrese número de DNI</label><br />
            <input type="text" value={texto} onChange={buscador} placeholder="Por ej: 20600100"/>
            {
                texto.length!==0?(
                    <div>{
                        bdata?(
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
                                                    <p> Está habilitado/a ✔️ </p>
                                                ) : (
                                                    <p> No está habilitado/a ❌ </p>
                                                )
                                            }
                                          </Card.Text>
                                        </Card.Body>
                                      </Card>
                                    })
                                }
                            </div>
                        ):(
                            <div>
                                <h4>hola</h4>
                            </div>
                        )           
                    }</div>
                ) : (
                    <div></div>
                )
            }
        </>
    )
}

export default Buscar;