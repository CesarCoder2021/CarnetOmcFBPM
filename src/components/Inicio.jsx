import React, { useState, useEffect } from "react";
import data from "../data/firebase";

const Inicio = ( ) => {

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

    const bdata = data.filter(x=>x.nombre.toLowerCase().includes(texto.toString().toLowerCase()))
 
    return(
        <>
            <h1>
                Buscar jugador
            </h1>
            <label>Nombre y apellido</label><br />
            <input type="text" value={texto} onChange={buscador} placeholder="Lucas López"/>
            {
                texto.length !==0?(
                    <div>
                        {
                            bdata.length!==0?(
                                <div>
                                    {
                                    bdata.map((jugador)=>{
                                        return <>
                                        <p> <b> Nombre:</b> {jugador.nombre} </p>
                                        <p> <b> DNI:</b> {jugador.dni} </p>
                                        <p> <b> Edad:</b> {jugador.edad} </p>
                                        <p> <b> Club:</b> {jugador.club} </p>
                                        </>
                                    })
                                    }
                                </div>
                            ) : (
                                <div>
                                    <h2>No se encontró ningun jugador llamado "{texto}" </h2>
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

export default Inicio;