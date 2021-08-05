import React, { useEffect, useState } from 'react';
import Error from './Error';
import axios from 'axios';



const Formulario = ({guardarMoneda,  guardarCriptomoneda }) => {

    // state del listado de criptomonedas
    const [ listacripto, setListacripto ] = useState([]);
    const [ error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    // Utilizar useMoneda
    const [ moneda, setMoneda ] = useState('');


    // utilizar useCriptomoneda
    const [criptomoneda, setCriptomoneda] = useState('');

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setListacripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);


    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        // pasar los datos al componente principal
        setError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <div>
                <label className = "label2">Elige tu Moneda</label>
                <select className = "select2"
                    onChange={ e => setMoneda(e.target.value)}
                    value={moneda}
                >
                    <option value="">- Seleccione -</option>
                    {MONEDAS.map(opcion => (
                        <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    ))}
                </select>
            </div>

            <div>
            <label className = "label1">Elige tu Criptomoneda</label>
            <select className = "select1"
                onChange={ e => setCriptomoneda(e.target.value)}
                value={criptomoneda}
            >
                <option value="">- Seleccione -</option>
                {listacripto.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

            <input className = "btn1"
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;