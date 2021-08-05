import React, {useState, useEffect} from 'react';
import './css/estilos.css';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect( () => {

      const cotizarCriptomoneda = async () => {
          // evitamos la ejecución la primera vez
          if(moneda === '') return;

          // consultar la api para obtener la cotizacion
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const resultado = await axios.get(url);

          // mostrar el spinner
         setCargando(true);

          // ocultar el spinner y mostrar el resultado
          setTimeout(() => {

            // cambiar el estado de cargando
            setCargando(false);

            // guardar cotizacion
            setResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
          }, 3000);

          
      }
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> :  <Cotizacion  resp={resultado} />

  return (
    <div className = "Contenedor">
        <div>
          <img 
            src={imagen}
            alt="imagen cripto"
          />
        </div>
        <div>
            <h1 className = "Heading">Cotiza Criptomonedas al Instante</h1>

            <Formulario 
              guardarMoneda={setMoneda}
              guardarCriptomoneda={setCriptomoneda}
            />

            {componente}
            
        </div>
    </div>
  );
}

export default App;