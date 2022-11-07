import React, { useState, useEffect } from "react";
import data from "../data/firebase";

const Buscar = ( ) => {

    const [texto, setTexto] = useState([])

    const buscador = ( {target} ) => {
        setTexto(target.value)
    }

    const [jugador, setJugador] = useState([])


    const buscarJugador = ( ) => {

        const url = data

        fetch(url)
         .then((resp)=> resp.json())
         .then((data)=> setJugador(data))

    }

    useEffect(()=>{
        buscarJugador()
    },[])

    const bdata = data.filter(x=>x.dni.toLowerCase().includes(texto.toString().toLowerCase()))
 
    return(
        <>
            <label>Ingrese número de DNI</label><br />
            <input type="text" value={texto} onChange={buscador} placeholder="Por ej: 20600100"/>
            {
                texto.length !==0?(
                    <div>
                        {
                            bdata.length!==0?(
                                <div>
                                    {
                                    bdata.map((jugador)=>{
                                        return <>
                                        <p> FOTO </p>
                                        <p> <b> DNI:</b> {jugador.dni} </p>
                                        <p> <b> Nombre y apellido:</b> {jugador.nombre} </p>
                                        <p> <b> Nivel:</b> {jugador.nivel} </p>
                                        {
                                            jugador.habilitado==='NO'?(
                                                <div>
                                                    <p><b>Habilitado:</b> ❌ </p>
                                                </div>
                                            )
                                        : 
                                            (
                                                <div>
                                                    <div>
                                                        <p><b> Habilitado:</b> ✔️</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        </>
                                    })
                                    }
                                </div>
                            ) : (
                                <div>
                                    <h4>No se encontró ningun DNI número "{texto}" </h4>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        
                    </div>
                )
            }
        </>
    )
}

export default Buscar;