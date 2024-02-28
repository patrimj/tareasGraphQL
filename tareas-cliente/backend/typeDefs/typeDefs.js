const { gql } = require('graphql-tag')

const typeDefs = gql`

type User {
  id: ID!
  nombre: String!
  email: String!
  password: String!
  tareas: [Tarea!]!
  roles: [Roles!]!
}

type Roles {
   id: ID!
  nombre: String!
  usuarios: [User!]!
}

type Tarea {
   id: ID!
  descripcion: String!
  dificultad: String!
  horas_previstas: Int!
  horas_realizadas: Int!
  porcentaje_realizacion: Int!
  completada: Boolean!
  usuarios: [User!]!
}

type Tarea_Asignada {
  id: ID
  id_tarea: ID
  id_usuario: ID
  tarea: Tarea
  usuario: User
}

 type Query {
  usuarios: [User]
  usuario(email: String!, password: String!): User
  tareasLibres: [Tarea_Asignada]
  tareasAsignadas(idUsuario: ID!): [Tarea_Asignada]
  tareas: [Tarea]
  tareasRealizadas: [Tarea]
  tareasPendientes: [Tarea]
  consultarTareaAsignada(idTarea: ID!, idUsuario: ID!): [Tarea_Asignada]
  tareasProgramador(id_usuario: ID!): [Tarea_Asignada]
 }

 type Mutation {
  login (email: String!, password: String!): User
  registro(id: ID!, nombre: String!, email: String!, password: String!): User
  cambiarPassword(email: String!, password: String!): User
  altaUsuario(id: ID!, nombre: String!, email: String!, password: String!): User
  bajaUsuario(id: ID!): Boolean
  modificarUsuario(id: ID!, nombre: String, email: String, password: String): User
  crearTarea(id: ID!, descripcion: String!, dificultad: String!, horas_previstas: Int!, horas_realizadas: Int!, porcentaje_realizacion: Int!, completada: Boolean!): Tarea
  modificarTarea(id: ID!, descripcion: String, dificultad: String, horas_previstas: Int, horas_realizadas: Int, porcentaje_realizacion: Int, completada: Boolean): Tarea
  eliminarTarea(id: ID!): Boolean
  asignarTarea(idTarea: ID!, idUsuario: ID!): Tarea_Asignada
  desasignarTarea(idTarea: ID!, idUsuario: ID!): Tarea_Asignada
  modificarTareaPro(id: ID!, horas_realizadas: Int, porcentaje_realizacion: Int, completada: Boolean): Tarea
}
`

module.exports = typeDefs;
