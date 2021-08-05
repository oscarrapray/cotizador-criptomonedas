import React from 'react';

const Cotizacion = ({resp}) => {
    if(Object.keys(resp).length === 0) return null;

    console.log(resp)

    return ( 
        <div className = "ResultadoDiv">
            <p className = "precio">El precio es: <span>{resp.PRICE}</span> </p>
            <p className = "info">Precio más alto del día: <span>{resp.HIGHDAY}</span> </p>
            <p className = "info">Precio más bajo del día: <span>{resp.LOWDAY}</span> </p>
            <p className = "info">Variación últimas 24 horas: <span>{resp.CHANGEPCT24HOUR}</span> </p>
            <p className = "info">Última Actualización: <span>{resp.LASTUPDATE}</span> </p>
        </div>
     );
}
 
export default Cotizacion;