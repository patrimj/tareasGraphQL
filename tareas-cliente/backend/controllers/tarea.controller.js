const models = require('../models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//LISTAR TAREAS LIBRES
const listarTareasLibres = async () => {
    try {
        const libres = await models.Tarea_Asignada.findAll({
            where: { id_usuario: null },
            include: [{
                model: models.Tarea,
                as: 'tarea',
            }]
        });
        return libres;
    } catch (error) {
        throw new Error('Error al obtener las tareas libres!', error);
    }
}

//ASIGNAR TAREA
const asignarTarea = async (id_tarea, id_usuario) => {
    try {
        const tareaAsignada = await models.Tarea_Asignada.update({
            id_usuario: id_usuario
        }, {
            where: {
                id_tarea: id_tarea
            }
        });

        if (tareaAsignada[0] !== 0) {
            const tareaActualizada = await models.Tarea_Asignada.findOne({
                where: { id_tarea: id_tarea },
                include: [{
                    model: models.Tarea,
                    as: 'tarea'
                }]
            });
            return tareaActualizada;
        }
    }
    catch (error) {
        throw new Error('Error al asignar la tarea!', error);
    }
}

const desasignarTarea = async (id_tarea, id_usuario) => {
    try {
        const tareaDesasignada = await models.Tarea_Asignada.update({
            id_usuario: null
        }, {
            where: {
                id_tarea: id_tarea,
                id_usuario: id_usuario
            }
        });

        if (tareaDesasignada[0] !== 0) {
            const tarea = await models.Tarea_Asignada.findOne({
                where: {
                    id_tarea: id_tarea
                }
            });
            return { id_tarea: tarea.id_tarea };
        }
    }
    catch (error) {
        throw new Error('Error al desasignar la tarea!', error);
    }
}


//LISTAR TAREAS ASIGNADAS
const listarTareasAsignadas = async (id_usuario) => {
    try {
        const asignadas = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario },
            include: [{
                model: models.Tarea,
                as: 'tarea'
            }]
        });
        return asignadas;
    } catch (error) {
        throw new Error('Error al obtener las tareas asignadas!', error);
    }
}

// CONSULTAR TAREA ASIGNADA
const consultarTareaAsignada = async (id_tarea, id_usuario) => {
    try {
        const asignada = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario, id_tarea: id_tarea },
            include: [{
                model: models.Tarea,
                as: 'tarea'
            }]
        });
        return asignada;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//LISTAR TODAS LAS TAREAS
const listarTareas = async () => {
    try {
        const tareas = await models.Tarea.findAll();
        return tareas;
    } catch (error) {
        throw new Error('Error al obtener las tareas!', error);
    }
}

//MODIFICAR TAREA 
const modificarTareaPro = async (id, body) => {
    try {
        const tarea = await models.Tarea.findByPk(id);
        if (!tarea) {
            throw new Error('No se encontró la tarea');
        }
        await models.Tarea.update(body, {
            where: {
                id: id
            }
        });
        const tareaActualizada = await models.Tarea.findByPk(id);
        return tareaActualizada;
    } catch (error) {
        throw new Error('Error al modificar la tarea!', error);
    }
}

///CREAR TAREA
const crearTarea = async (body) => {
    try {
        const nuevaTarea = await models.Tarea.create(body);
        return nuevaTarea;
    } catch (error) {
        throw new Error('Error al crear la tarea!', error);
    }
}

//MODIFICAR TAREA 
const modificarTarea = async (id, body) => {
    try {
        const tarea = await models.Tarea.findByPk(id);
        if (!tarea) {
            throw new Error('No se encontró la tarea');
        }
        await models.Tarea.update(body, {
            where: {
                id: id
            }
        });
        const tareaActualizada = await models.Tarea.findByPk(id);
        return tareaActualizada;
    } catch (error) {
        throw new Error('Error al modificar la tarea!', error);
    }
}

//ELIMINAR TAREA
const eliminarTarea = async (id) => {
    try {
        const tarea = await models.Tarea.findByPk(id);
        if (!tarea) {
            throw new Error('No se encontró la tarea');
        }
        await models.Tarea.destroy({
            where: {
                id: id
            }
        });
        return true;
    } catch (error) {
        throw new Error('Error al eliminar la tarea!', error);
    }
}

// VER TAREAS PROGRAMADOR
const verTareasProgramador = async (id_usuario) => {
    try {
        const tareas = await models.Tarea_Asignada.findAll({
            where: { id_usuario: id_usuario },
            include: [{
                model: models.Tarea,
                as: 'tarea'
            }]
        });
        return tareas;
    } catch (error) {
        throw new Error('Error al obtener las tareas del programador!', error);
    }
}

// VER TODAS LAS TAREAS REALIZADAS 
const verTareasRealizadas = async () => {
    try {
        const realizadas = await models.Tarea.findAll({
            where: { completada: true }
        });
        return realizadas;
    } catch (error) {
        throw new Error('Error al obtener las tareas realizadas!', error);
    }
}

// VER TODAS LAS TAREAS PENDIENTES 
const verTareasPendientes = async () => {
    try {
        const pendientes = await models.Tarea.findAll({
            where: { completada: false }
        });
        return pendientes;
    } catch (error) {
        throw new Error('Error al obtener las tareas pendientes!', error);
    }
}

// -------------------------------- EXPORTACIONES -------------------------------- 

module.exports = {
    listarTareasLibres,
    asignarTarea,
    desasignarTarea,
    listarTareasAsignadas,
    consultarTareaAsignada,
    listarTareas,
    crearTarea,
    modificarTarea,
    eliminarTarea,
    verTareasProgramador,
    verTareasRealizadas,
    verTareasPendientes,
    modificarTareaPro
}
