const { login, registro, cambiarPassword, getUsuarios, altaUsuario, bajaUsuario, modificarUsuario } = require('../controllers/usuario.controller')
const { listarTareasLibres, asignarTarea, desasignarTarea, listarTareasAsignadas, consultarTareaAsignada, listarTareas, crearTarea, modificarTarea, eliminarTarea,  verTareasProgramador, verTareasRealizadas, verTareasPendientes, modificarTareaPro} = require('../controllers/tarea.controller')

const resolvers = {
  Query: {
    usuarios:  () =>  getUsuarios(),
    usuario: (_, { email, password }) => login(email, password),
    tareasLibres: () => listarTareasLibres(),
    tareasAsignadas: (_, {idUsuario}) => listarTareasAsignadas(idUsuario),
    tareas: () => listarTareas(),
    tareasRealizadas: () => verTareasRealizadas(),
    tareasPendientes: () => verTareasPendientes(),
    consultarTareaAsignada: (_, { idTarea, idUsuario }) => consultarTareaAsignada(idTarea, idUsuario),
    tareasProgramador: (_, { id_usuario }) => verTareasProgramador(id_usuario)
  },
  Mutation: {

    login : (_, { email, password }) => {
      const usuario = login(email, password)
      return usuario
    },

    registro: (_, { id, nombre, email, password }) => {
      const nuevoUsuario = {
        id: id,
        nombre: nombre,
        email: email,
        password: password
      }
      const usuarioAgregado = registro(nuevoUsuario)

      return usuarioAgregado
    },

    cambiarPassword: (_, { email, password }) => {
      const usuarioModificado = cambiarPassword(email, password)
      return usuarioModificado
    },

    altaUsuario: (_, { id, nombre, email, password }) => {
      const nuevoUsuario = {
        id: id,
        nombre: nombre,
        email: email,
        password: password
      }
      const usuarioAgregado = altaUsuario(nuevoUsuario)

      return usuarioAgregado
    },

    bajaUsuario: (_, { id }) => {
      const usuarioEliminado = bajaUsuario(id)
      return usuarioEliminado
    },
    modificarUsuario: (_, { id, nombre, email, password }) => {
      const usuarioModificado = modificarUsuario(id, { nombre, email, password })
      return usuarioModificado
    },
    crearTarea: (_, { id, descripcion, dificultad, horas_previstas, horas_realizadas, porcentaje_realizacion, completada }) => {
      const nuevaTarea = {
        id: id,
        descripcion: descripcion,
        dificultad: dificultad,
        horas_previstas: horas_previstas,
        horas_realizadas: horas_realizadas,
        porcentaje_realizacion: porcentaje_realizacion,
        completada: completada
      }
      const tareaAgregada = crearTarea(nuevaTarea)

      return tareaAgregada
    },
    modificarTarea: (_, { id, descripcion, dificultad, horas_previstas, horas_realizadas, porcentaje_realizacion, completada }) => {
      const tareaModificada = modificarTarea(id, { descripcion, dificultad, horas_previstas, horas_realizadas, porcentaje_realizacion, completada })
      return tareaModificada
    },
    eliminarTarea: (_, { id }) => {
      const tareaEliminada = eliminarTarea(id)
      return tareaEliminada
    },
    asignarTarea: (_, { idTarea, idUsuario }) => {
      const tareaAsignada = asignarTarea(idTarea, idUsuario)
      return tareaAsignada
    },
    desasignarTarea: (_, { idTarea, idUsuario }) => {
      const tareaDesasignada = desasignarTarea(idTarea, idUsuario)
      return tareaDesasignada
    },
    modificarTareaPro: (_, {id, horas_realizadas, porcentaje_realizacion, completada}) => {
      const tareaModificada = modificarTareaPro(id, {horas_realizadas, porcentaje_realizacion, completada})
      return tareaModificada
    }

  },
};

module.exports = resolvers;