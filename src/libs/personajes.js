import data from './personajes_orgullo.json'; // o desde donde tienes los datos cargados

export const getPersonajePorNombre = (nombre) => {
    return data.find(p => p.nombre === nombre);
}

export const getPersonajePorId = (id) => {
    return data.find(p => p.id === id);
}
