# EJERCICIO MONGOOSE - NODEJS
---

## ÍNDICE
[1. COMANDOS UTILIZADOS](#1-comandos-utilizados)

[2. MANUAL DE USO DE LA API](#2-manual-de-uso-de-la-api)

---
## 1. COMANDOS UTILIZADOS

- Instalar ``dependencias`` 
``` bash
npm install 
```
-  Instalar ``GraphQL``
``` bash
npm install graphql
```
- Instalar ``graphql-tag``
``` bash
npm install graphql-tag
```
- Instalar apolo server
``` bash
npm install @apollo/server
```

## 2. MANUAL DE USO DE LA API

## RUTAS USUARIOS

---
#### Registrar usuario

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del usuario 
  - `email`: Email del usuario 
  - `password`: Contraseña del usuario

##### Ejemplo de solicitud para registrar usuario

```GraphQL
mutation {
  registro(
    id: "1"
    nombre: "usuario"
    email: "usuario@correo.com"
    password: "admin123"
  ) {
    id
    nombre
    email
    password
  }
}
```

##### Ejemplo de respuesta para registrar usuario

```JSON
{
  "data": {
    "altaUsuario": {
      "id": "1",
      "nombre": "usuario",
      "email": "usuario@correo.com",
      "password": "admin123"
    }
  }
}
```

> [!NOTE] EL ID DEBE SER UNICO, JUNTO CON EL EMAIL

---


#### Iniciar sesión

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `email`: Email del usuario 
  - `password`: Contraseña del usuario 

##### Ejemplo de solicitud para iniciar sesión
    
```GraphQL
query {
  usuario(email: "usuario@correo.com", password: "admin123") {
    id
    nombre
    email
  }
}
```

##### Ejemplo de respuesta para iniciar sesión

```JSON
{
  "data": {
    "usuario": {
      "id": "1",
      "nombre": "usuario",
      "email": "usuario@correo.com"
    }
  }
}
```

---

#### Dar de alta a un usuario

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del usuario
  - `email`: Email del usuario 
  - `password`: Contraseña del usuario 

##### Ejemplo de solicitud para dar de alta a un usuario

```GraphQL
mutation {
  altaUsuario(
    id: 2
    nombre: "Usuario2"
    email: "usuario2@correo.com"
    password: "admin123"
  ) {
    id
    nombre
    email
    password
  }
}
```

##### Ejemplo de respuesta para dar de alta a un usuario

```JSON
{
  "data": {
    "altaUsuario": {
      "id": "2",
      "nombre": "Usuario2",
      "email": "usuario2@correo.com",
      "password": "admin123"
    }
  }
}
```
> [!NOTE] EL ID DEBE SER UNICO, JUNTO CON EL EMAIL

---

#### Ver todos los usuarios

- URL: `localhost:9080/graphql`
- Método: `POST`

##### Ejemplo de solicitud para ver todos los usuarios

```GraphQL
query {
  usuarios {
    id
    nombre
    email
  }
}
```

##### Ejemplo de respuesta para ver todos los usuarios

```JSON
{
  "data": {
    "usuarios": [
      {
        "id": "1",
        "nombre": "Hailey",
        "email": "Homero_LongoriaPaez@yahoo.com"
      },
      {
        "id": "3",
        "nombre": "Admin",
        "email": "admin@correo.com"
      },
      {
        "id": "4",
        "nombre": "usuario",
        "email": "usuario@correo.com"
      }
    ]
  }
}
```
---

#### Cambiar contraseña

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del usuario 
  - `email`: Email del usuario 
  - `password`: Contraseña del usuario 

##### Ejemplo de solicitud para cambiar contraseña
    
```GraphQL
mutation {
  cambiarPassword(email: "usuario@correo.com", password: "cambioContrasena") {
    email
  }
}
```

##### Ejemplo de respuesta para cambiar contraseña

```JSON
{
  "data": {
    "cambiarPassword": {
      "email": "usuario@correo.com",
      "password": "cambioContrasena"
    }
  }
}
```

---

#### Baja de usuario

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del usuario 

##### Ejemplo de solicitud para dar de baja a un usuario
    
```GraphQL
mutation {
 bajaUsuario(id:1)
}
```

##### Ejemplo de respuesta para dar de baja a un usuario

```JSON
{
  "data": {
    "bajaUsuario": true
  }
}
```

---

#### Modificar usuario

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del usuario 
  - `nombre`: Nombre del usuario 
  - `email`: Email del usuario 
  - `password`: Contraseña del usuario

##### Ejemplo de solicitud para modificar usuario
    
```GraphQL
    mutation {
      modificarUsuario(
        id: 2
        nombre: "Usuario"
        email: "usuarioa@correo.com"
        password: "admin123"
        ) {
        id
        nombre
        email
        password
        }
    }
```
> [!NOTE] EL ID DEBE SER EL ID DEL USUARIO A MODIFICAR, Y SU EMAIL DEBE SER UNICO

##### Ejemplo de respuesta para modificar usuario

```JSON
{
  "data": {
    "modificarUsuario": {
      "id": "2",
      "nombre": "Usuario",
      "email": "usuarioa@correo.com",
      "password": "admin123"
    }
  }
}
```

---

## RUTAS TAREAS

---

#### Listar tareas libres

- URL: `localhost:9080/graphql`
- Método: `POST`

##### Ejemplo de solicitud para listar tareas libres

```GraphQL
query {
  tareasLibres {
      id_tarea
      id_usuario
      tarea {
      descripcion }
    }
}
```

##### Ejemplo de respuesta para listar tareas libres

```JSON
{
  "data": {
    "tareasLibres": [
      {
        "id_tarea": "3",
        "id_usuario": null,
        "tarea": {
          "descripcion": "Tarea"
        }
      }
    ]
  }
}
```

---

#### Asignar tarea

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `idTarea`: ID de la tarea 
  - `idUsuario`: ID del usuario 

##### Ejemplo de solicitud para asignar tarea
    
```GraphQL
mutation {
  asignarTarea(idTarea: 3, idUsuario: 747) {
    tarea {
      id
      descripcion
    }
  }
}
```

##### Ejemplo de respuesta para asignar tarea

```JSON
{
  "data": {
    "asignarTarea": {
      "tarea": {
        "id": "3",
        "descripcion": "Tarea"
      }
    }
  }
}
```
---

#### Designar tarea

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `idTarea`: ID de la tarea 
  - `idUsuario`: ID del usuario 

##### Ejemplo de solicitud para designar tarea

```GraphQL
mutation {
  desasignarTarea(idTarea: 2, idUsuario: 1) {
    id_tarea
  }
}
```

##### Ejemplo de respuesta para designar tarea

```JSON
{
  "data": {
    "desasignarTarea": {
      "id_tarea": "2"
    }
  }
}
```

---

#### Tareas asignadas

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `idUsuario`: ID del usuario 
  
##### Ejemplo de solicitud para ver tareas asignadas
    
```GraphQL
query {
  tareasAsignadas(idUsuario: 1) {
    id_tarea
    id_usuario
    tarea {
      id
      descripcion
      dificultad
      horas_previstas
      horas_realizadas
      porcentaje_realizacion
      completada
    }
  }
}
```

##### Ejemplo de respuesta para ver tareas asignadas

```JSON
{
  "data": {
    "tareasAsignadas": [
      {
        "id_tarea": "1",
        "id_usuario": "1",
        "tarea": {
          "id": "1",
          "descripcion": "Tarea creada desde cliente 3",
          "dificultad": "S",
          "horas_previstas": 10,
          "horas_realizadas": 0,
          "porcentaje_realizacion": 0,
          "completada": false
        }
      }
    ]
  }
}
```

---

#### Consultar tarea asignada

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `idTarea`: ID de la tarea 
  - `idUsuario`: ID del usuario 

##### Ejemplo de solicitud para consultar tare asignada
    
```GraphQL
query {
  consultarTareaAsignada(idTarea: 1, idUsuario:1) {
    id_tarea
    id_usuario
    tarea {
      id
      descripcion
      dificultad
      horas_previstas
      horas_realizadas
      porcentaje_realizacion
      completada
    }
  }
}
```

##### Ejemplo de respuesta para consultar tarea asignada

```JSON
{
  "data": {
    "consultarTareaAsignada": [
      {
        "id_tarea": "1",
        "id_usuario": "1",
        "tarea": {
          "id": "1",
          "descripcion": "Tarea creada desde cliente 3",
          "dificultad": "S",
          "horas_previstas": 10,
          "horas_realizadas": 0,
          "porcentaje_realizacion": 0,
          "completada": false
        }
      }
    ]
  }
}
```
--- 

#### Listar todas las tareas

- URL: `localhost:9080/graphql`
- Método: `POST`

##### Ejemplo de solicitud para listar todas las tareas

```GraphQL
query {
  tareas {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para listar todas las tareas

```JSON

{
  "data": {
    "tareas": [
      {
        "id": "1",
        "descripcion": "Tarea creada desde cliente 3",
        "dificultad": "S",
        "horas_previstas": 10,
        "horas_realizadas": 0,
        "porcentaje_realizacion": 0,
        "completada": false
      },
      {
        "id": "2",
        "descripcion": "Tarea 2 ",
        "dificultad": "XL",
        "horas_previstas": 13,
        "horas_realizadas": 10,
        "porcentaje_realizacion": 80,
        "completada": false
      },
      {
        "id": "3",
        "descripcion": "Tarea",
        "dificultad": "XL",
        "horas_previstas": 13,
        "horas_realizadas": 10,
        "porcentaje_realizacion": 80,
        "completada": false
      }
    ]
  }
}
```
--- 
#### Crear tarea

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID de la tarea (string, requerido)
  - `descripcion`: Descripción de la tarea 
  - `dificultad`: Dificultad de la tarea 
  - `horas_previstas`: Horas previstas para la tarea  
  - `horas_realizadas`: Horas realizadas para la tarea  
  - `porcentaje_realizacion`: Porcentaje de realización de la tarea  
  - `completada`: Estado de la tarea 

##### Ejemplo de solicitud para crear tarea
    
```GraphQL

mutation {
  crearTarea(
    id: 45
    descripcion: "Tarea creada con GraphQL"
    dificultad: "XS"
    horas_previstas: 12
    horas_realizadas: 0
    porcentaje_realizacion: 0
    completada: false
  ) {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para crear tarea

```JSON
{
  "data": {
    "crearTarea": {
      "id": "45",
      "descripcion": "Tarea creada con GraphQL",
      "dificultad": "XS",
      "horas_previstas": 12,
      "horas_realizadas": 0,
      "porcentaje_realizacion": 0,
      "completada": false
    }
  }
}
```

---

#### Modificar tarea

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID de la tarea (string, requerido)
  - `descripcion`: Descripción de la tarea 
  - `dificultad`: Dificultad de la tarea 
  - `horas_previstas`: Horas previstas para la tarea  
  - `horas_realizadas`: Horas realizadas para la tarea 
  - `porcentaje_realizacion`: Porcentaje de realización de la tarea 
  - `completada`: Estado de la tarea 

##### Ejemplo de solicitud para modificar tarea
        
```GraphQL
mutation {
  modificarTarea(
    id: 45
    descripcion: "Tarea creada y modificada con GraphQL"
    dificultad: "XS"
    horas_previstas: 12
    horas_realizadas: 0
    porcentaje_realizacion: 0
    completada: false
  ) {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para modificar tarea

```JSON
{
  "data": {
    "modificarTarea": {
      "id": "45",
      "descripcion": "Tarea creada y modificada con GraphQL",
      "dificultad": "XS",
      "horas_previstas": 12,
      "horas_realizadas": 0,
      "porcentaje_realizacion": 0,
      "completada": false
    }
  }
}
```

---

#### Modificar tarea programador

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID de la tarea 
  - `horas_realizadas`: Horas realizadas para la tarea 
  - `porcentaje_realizacion`: Porcentaje de realización de la tarea 
  - `completada`: Estado de la tarea 

##### Ejemplo de solicitud para modificar tarea programador
    
```GraphQL
    mutation {
  modificarTareaPro(id: "1", horas_realizadas: 5, porcentaje_realizacion: 50, completada: false) {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para modificar tarea programador

```JSON
{
  "data": {
    "modificarTareaPro": {
      "id": "1",
      "descripcion": "Tarea creada desde cliente 3",
      "dificultad": "S",
      "horas_previstas": 10,
      "horas_realizadas": 5,
      "porcentaje_realizacion": 50,
      "completada": false
    }
  }
}
```
---

#### Eliminar tarea

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id`: ID de la tarea 

##### Ejemplo de solicitud para eliminar tarea

```GraphQL
mutation {
 eliminarTarea(id:35)
}
```

##### Ejemplo de respuesta para eliminar tarea

```JSON
{
  "data": {
    "eliminarTarea": true
  }
}
```
---

#### Ver tareas programador

- URL: `localhost:9080/graphql`
- Método: `POST`
- Datos requeridos:
  - `id_usuario`: ID del usuario  


##### Ejemplo de solicitud para ver tareas programador

```GraphQL
query {
  tareasProgramador(id_usuario: 1) {
    id_tarea
    id_usuario
    tarea {
      id
      descripcion
      dificultad
      horas_previstas
      horas_realizadas
      porcentaje_realizacion
      completada
    }
  }
}
```

##### Ejemplo de respuesta para ver tareas programador

```JSON
{
  "data": {
    "tareasProgramador": [
      {
        "id_tarea": "1",
        "id_usuario": "1",
        "tarea": {
          "id": "1",
          "descripcion": "Tarea creada desde cliente 3",
          "dificultad": "S",
          "horas_previstas": 10,
          "horas_realizadas": 5,
          "porcentaje_realizacion": 50,
          "completada": false
        }
      }
    ]
  }
}
```

---

#### Ver tareas realizadas

- URL: `localhost:9080/graphql`
- Método: `POST`

##### Ejemplo de solicitud para ver tareas realizadas

```GraphQL
query {
  tareasRealizadas {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para ver tareas realizadas

```JSON

{
  "data": {
    "tareasRealizadas": [
      {
        "id": "4",
        "descripcion": "Tarea 2",
        "dificultad": "XL",
        "horas_previstas": 13,
        "horas_realizadas": 10,
        "porcentaje_realizacion": 80,
        "completada": true
      }
    ]
  }
}
```
---

#### Ver tareas pendientes

- URL: `localhost:9080/graphql`
- Método: `POST`

##### Ejemplo de solicitud para ver tareas pendientes

```GraphQL

query {
  tareasPendientes {
    id
    descripcion
    dificultad
    horas_previstas
    horas_realizadas
    porcentaje_realizacion
    completada
  }
}
```

##### Ejemplo de respuesta para ver tareas pendientes

```JSON

{
  "data": {
    "tareasPendientes": [
      {
        "id": "1",
        "descripcion": "Tarea creada desde cliente 3",
        "dificultad": "S",
        "horas_previstas": 10,
        "horas_realizadas": 0,
        "porcentaje_realizacion": 0,
        "completada": false
      },
      {
        "id": "2",
        "descripcion": "Tarea 2 ",
        "dificultad": "XL",
        "horas_previstas": 13,
        "horas_realizadas": 10,
        "porcentaje_realizacion": 80,
        "completada": false
      },
    ]
  }
}
```
---






