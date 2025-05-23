import { use, useEffect, useState } from 'react'
import confetti from 'canvas-confetti';
import videoBg from './assets/fondouno.mp4';
import videoBgDos from './assets/FondoSeis.mp4';
import videoBgTres from './assets/Error.mp4';

import './App.css'
import { getPersonajePorId } from './libs/personajes'


function App() {
  const [perso, setPerso] = useState(null);
  const [pistasper, setpistasper] = useState(null);
  const [pistasMostradas, setPistasMostradas] = useState(0);
  const [detalles, setDetalles] = useState(null);
  const [mensanega, setMensanega] = useState(false);

  const getPersonaje = () => {

    // Obtener el array actual de IDs usados o iniciarlo vacío
    let arrUsados = JSON.parse(window.localStorage.getItem('usados')) || [];

    // Verificar si ya se usaron todos los personajes
    if (arrUsados.length >= 39) {
      alert("Ya se han usado todos los personajes.");
      return;
    }

    // Generar un número aleatorio que no esté repetido
    let numeroSelec;
    do {
      numeroSelec = Math.floor(Math.random() * 39) + 1;
    } while (arrUsados.includes(numeroSelec));

    // Obtener el personaje por ID
    const dataPersonaje = getPersonajePorId(numeroSelec);

    // Guardar el personaje en el estado y mostrar sus pistas
    setPerso(dataPersonaje);
    setpistasper(dataPersonaje.pistas);
    setPistasMostradas(0);
    setDetalles(null);

    // Guardar personaje actual en localStorage
    window.localStorage.setItem('personaje', JSON.stringify(dataPersonaje));

    // Agregar el nuevo ID al array de usados
    arrUsados.push(dataPersonaje.id);
    window.localStorage.setItem('usados', JSON.stringify(arrUsados));

  }

  const sumarPista = () => {
    if (pistasMostradas === null) {
      setPistasMostradas(0)
      console.log('pasa por el null')
      return
    }

    if (pistasMostradas >= pistasper.length) {
      setPistasMostradas(null)
      console.log('pasa por el maximo')
      return
    }

    setPistasMostradas(pistasMostradas + 1)
    console.log('pasa por el set')
  }

  const detallePersonaje = () => {

    const personaje = JSON.parse(window.localStorage.getItem('personaje'));

    const personajeActual = personaje ? personaje : perso;

    if (personajeActual) {
      setDetalles(personajeActual);
      launchConfetti();
    }
  }


  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  };

  const launchConfetti = () => {
    fire(0.80, { spread: 500, startVelocity: 500 });
    fire(0.20, { spread: 200 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 2 });
    fire(0.10, { spread: 500, startVelocity: 500, decay: 5.92, scalar: 2 });
    fire(0.10, { spread: 600, startVelocity: 500 });
  };

  const restarurar = () => {
    window.localStorage.removeItem('personaje');
    window.localStorage.removeItem('usados');
    setPerso(null);
    setpistasper(null);
    setPistasMostradas(0);
    setDetalles(null)
  }

  const negative = () => {
    setMensanega(!mensanega)
    setTimeout(() => {
      setMensanega(false)
    }, 10000);
  }




  return (
    <>

      <div className='container-total'>

        {mensanega && (
          <div className='container-mensanega'>
            <div className="container-video">
              <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoBgTres} type="video/mp4" />
                Tu navegador no soporta el video en HTML5.
              </video>
              <div className="contenido">
                <h1>Incorrecto</h1>
                <h2>¡Sigue intentando!</h2>

              </div>
            </div>
          </div>

        )}

        <button type="button" className='btn-secret' onClick={restarurar}>R</button>
        <button type="button" className='btn-secret-negative' onClick={negative}>N</button>


        <div className="container-video">
          <video
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoBgDos} type="video/mp4" />
            Tu navegador no soporta el video en HTML5.
          </video>

          <div className="contenido">
            {detalles ? (
              <div className="container-detalles" style={{ width: '100%' }}>
                <div className="container-imagen" style={{ width: '100%' }}>
                  <img src={detalles.imagen} alt="NoImagen" />
                </div>

                <br /><br />
                <h1 style={{ marginTop: '5rem' }}><strong>{detalles.nombre}</strong></h1>
                <br />
                <p>___________________________________</p>
                <h2 style={{ padding: '0 2rem 0 2rem' }}><strong>{detalles.razon_orgullo}</strong></h2>
                <p>___________________________________</p>
                <h2><strong>Origen:</strong> {detalles.fuente}</h2>
              </div>
            ) : (
              <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoBg} type="video/mp4" />
                Tu navegador no soporta el video en HTML5.
              </video>
            )}
          </div>
        </div>


        <div className='containerform'>

          <div>
            <h1>¿Quien Soy?</h1>

            <div className="container-botones" >
              <button type="button" className='btn-fun' onClick={getPersonaje}>JUGAR</button>
              {perso && (<>
                <button type="button" className='btn-fun' onClick={sumarPista}>PISTA</button>
                <button type="button" className='btn-fun' onClick={detallePersonaje}>DESCUBRIR</button>
              </>)}

            </div>

          </div>

          <div>
            {pistasper && pistasper.length > 0 && (
              <div>
                {pistasper.slice(0, pistasMostradas + 1).map((pista, index) => (
                  <h2 key={index}>{index + 1}. {pista}</h2>
                ))}
              </div>
            )}

          </div>

        </div>


      </div>
    </>
  )
}

export default App
