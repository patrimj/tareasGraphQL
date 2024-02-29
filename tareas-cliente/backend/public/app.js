async function enviarConsulta(query, variables = {}) {
    try {
        const response = await fetch('http://localhost:9080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la consulta GraphQL:', error);
        return { errors: [{ message: 'Error al enviar la consulta GraphQL' }] };
    }
}

async function registrarUsuario() {
    const id = prompt('Ingrese el ID del usuario:');
    const nombre = prompt('Ingrese un nombre:');
    const email = prompt('Ingrese un email:');
    const password = prompt('Ingrese una contraseña:');
    const query = `
        mutation($id: ID!, $nombre: String!, $email: String!, $password: String!) {
            registro(id: $id, nombre: $nombre, email: $email, password: $password) {
                id
                nombre
                email
            }
        }
    `;
    const variables = { id, nombre, email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function loginUsuario() {
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese el password:');
    const query = `
        mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                id
                nombre
                email
            }
        }
    `;
    const variables = { email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function getUsuarios() {
    const query = `
    query {
        usuarios {
          id
          nombre
          email
        }
    }
    `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}


async function altaUsuario() {
    const id = prompt('Ingrese el ID del usuario:');
    const nombre = prompt('Ingrese un nombre:');
    const email = prompt('Ingrese un email:');
    const password = prompt('Ingrese una contraseña:');
    const query = `
      mutation($id: ID!, $nombre: String!, $email: String!, $password: String!) {
        altaUsuario(id: $id, nombre: $nombre, email: $email, password: $password) {
            id
            nombre
            email
            password
        }
    }
    `;

    const variables = { id, nombre, email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function cambiarPassword() {
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese una nueva contraseña:');
    const query = `
      mutation($email: String!, $password: String!) {
        cambiarPassword(email: $email, password: $password) {
            email
            password
        }
    }
    `;
    const variables = { email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function bajaUsuario() {
    const id = prompt('Ingrese el ID del usuario a eliminar:');
    const query = `
      mutation($id: ID!) {
        bajaUsuario(id: $id)
      }
    `;

    const variables = { id: parseInt(id) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function modificarUsuario() {
    const id = prompt('Ingrese el ID del usuario a editar:');
    const nombre = prompt('Ingrese el nombre:');
    const email = prompt('Ingrese el email:');
    const password = prompt('Ingrese una contraseña:');
    const query = `
      mutation($id: ID!, $nombre: String!, $email: String!, $password: String!) {
        modificarUsuario(id: $id, nombre: $nombre, email: $email, password: $password) {
          id
          nombre
          email
          password
        }
        }
    `;
    const variables = { id: parseInt(id), nombre, email, password };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function listarTareasLibres() {
    const query = `
    query {
        tareasLibres {
            id_tarea
            id_usuario
            tarea {
            descripcion }
          }
      }
    `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function asignarTarea() {
    const idTarea = prompt('Ingrese el ID de la tarea a asignar:');
    const idUsuario = prompt('Ingrese el ID del usuario:');
    const query = `
    mutation($idTarea: ID!, $idUsuario: ID!) {
      asignarTarea(idTarea: $idTarea, idUsuario: $idUsuario) {
        id_tarea
        id_usuario
      }
    }
    `;
    const variables = { idTarea: parseInt(idTarea), idUsuario: parseInt(idUsuario) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function desasignarTarea() {
    const idTarea = prompt('Ingrese el ID de la tarea a desasignar:');
    const idUsuario = prompt('Ingrese el ID del usuario:');
    const query = `
    mutation($idTarea: ID!, $idUsuario: ID!) {
      desasignarTarea(idTarea: $idTarea, idUsuario: $idUsuario) {
        id_tarea
      }
    }
    `;
    const variables = { idTarea: parseInt(idTarea), idUsuario: parseInt(idUsuario) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}


async function tareasAsignadas() {
    const idUsuario = prompt('Ingrese el ID del usuario:');
    const query = `
    query($idUsuario: ID!) {
      tareasAsignadas(idUsuario: $idUsuario) {
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
    `;

    const variables = { idUsuario: parseInt(idUsuario) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function consultarTareaAsignada() {
    const idTarea = prompt('Ingrese el ID de la tarea:');
    const idUsuario = prompt('Ingrese el ID del usuario:');
    const query = `
    query($idTarea: ID!, $idUsuario: ID!) {
      consultarTareaAsignada(idTarea: $idTarea, idUsuario: $idUsuario) {
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
    `;
    const variables = { idTarea: parseInt(idTarea), idUsuario: parseInt(idUsuario) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}

async function getTareas() {
    const query = `
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
    `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}


async function crearTarea() {

    const id = prompt('Ingrese el ID de la tarea:');
    const descripcion = prompt('Ingrese la descripcion:');
    const dificultad = prompt('Ingrese la dificultad:');
    const horas_previstas = prompt('Ingrese las horas previstas:');
    const horas_realizadas = prompt('Ingrese las horas realizadas:');
    const porcentaje_realizacion = prompt('Ingrese el porcentaje de realizacion:');
    const completada = prompt('Ingrese si esta completada:');
    const query = `

    mutation {
        crearTarea(
            id: ${id}
            descripcion: "${descripcion}"
            dificultad: "${dificultad}"
            horas_previstas: ${horas_previstas}
            horas_realizadas: ${horas_realizadas}
            porcentaje_realizacion: ${porcentaje_realizacion}
            completada: ${completada}
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
        `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function modificarTarea() {
    const id = prompt('Ingrese el ID de la tarea a editar:');
    const descripcion = prompt('Ingrese la descripcion:');
    const dificultad = prompt('Ingrese la dificultad:');
    const horas_previstas = prompt('Ingrese las horas previstas:');
    const horas_realizadas = prompt('Ingrese las horas realizadas:');
    const porcentaje_realizacion = prompt('Ingrese el porcentaje de realizacion:');
    const completada = prompt('Ingrese si esta completada:');
    const query = `
    mutation {
      modificarTarea(
        id: ${id}
        descripcion: "${descripcion}"
        dificultad: "${dificultad}"
        horas_previstas: ${horas_previstas}
        horas_realizadas: ${horas_realizadas}
        porcentaje_realizacion: ${porcentaje_realizacion}
        completada: ${completada}
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
    `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function modificarTareaPro() {
    const id = prompt('Ingrese el ID de la tarea a editar:');
    const horas_realizadas = prompt('Ingrese las horas realizadas:');
    const porcentaje_realizacion = prompt('Ingrese el porcentaje de realizacion:');
    const completada = prompt('Ingrese si esta completada:');
    const query = `
    mutation {
      modificarTareaPro(
        id: ${id}
        horas_realizadas: ${horas_realizadas}
        porcentaje_realizacion: ${porcentaje_realizacion}
        completada: ${completada}
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
    `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function eliminarTarea() {
    const id = prompt('Ingrese el ID de la tarea a eliminar:');
    const query = `
    mutation {
      eliminarTarea(id: ${id})
    }
    `;
    const data = await enviarConsulta(query);
    mostrarResultado(data);
}

async function tareasProgramador() {
    const idUsuario = prompt('Ingrese el ID del usuario:');
    const query = `
    query($idUsuario: ID!) {
        tareasProgramador(id_usuario: $idUsuario) {
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

    `;
    const variables = { idUsuario: parseInt(idUsuario) };
    const data = await enviarConsulta(query, variables);
    mostrarResultado(data);
}


async function tareasRealizadas() {
    const query = `
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
    `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}


async function tareasPendientes() {
    const query = `
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
    `;

    const data = await enviarConsulta(query);
    mostrarResultado(data);
}


function mostrarResultado(data) {
    const resultadoDiv = document.getElementById('resultado');

    if (data.errors) {
        const formattedErrors = JSON.stringify(data.errors, null, 2)
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');
        resultadoDiv.innerHTML = `Error: <pre>${formattedErrors}</pre>`;
    } else {
        const formattedData = JSON.stringify(data.data, null, 2)
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;');
        resultadoDiv.innerHTML = `<pre>${formattedData}</pre>`;
    }
}