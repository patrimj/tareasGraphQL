const { response, request } = require('express');

const models = require('../models/index.js');

//LOGIN
const login = async (email, password) => {
    try {
        const usuario = models.User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (!usuario) {
            throw new Error('No se encontró el usuario');
        }
        return usuario;
    } catch (error) {
        throw new Error('Error al obtener el usuario!', error);
        //return null;
    }
}

// REGISTRARSE
const registro = async (body) => {
    try {
        const usuarioNuevo = models.User.create(body);

        if (!usuarioNuevo) {
            throw new Error('No se pudo registrar el usuario');
        }

        return usuarioNuevo;
    } catch (error) {
        throw new Error('Error al registrar el usuario!', error);
        //return null;
    }
}

// CAMBIAR PASSWORD
const cambiarPassword = async (email, password) => {
    try {
        const usuario = await models.User.findOne({
            where: {
                email: email
            }
        });
        if (!usuario) {
            throw new Error('No se encontró el usuario');
        }
        await models.User.update({ password: password }, {
            where: {
                email: email
            }
        });
        const usuarioActualizado = await models.User.findOne({
            where: {
                email: email
            }
        });

        return usuarioActualizado;
    } catch (error) {
        throw new Error('Error al cambiar la contraseña!', error);
        //return null;
    }
}

//VER USUARIOS
const getUsuarios = async () => {
    try {
        const usuarios = await models.User.findAll();
        console.log(usuarios);
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener los usuarios!', error);

    }
};

//ALTA USUARIO
const altaUsuario = async (body) => {
    try {
        const usuarioNuevo = await models.User.create(body);
        if (!usuarioNuevo) {
            throw new Error('No se pudo dar de alta al usuario');
        }else{
            console.log('Usuario dado de alta');
            return usuarioNuevo;
        }
    } catch (error) {
        throw new Error('Error al dar de alta al usuario!', error);

    }
}

//BAJA USUARIO
const bajaUsuario = async (id) => {
    try {
        const usuario = await models.User.findByPk(id);
        if (!usuario) {
            throw new Error('No se encontró el usuario');
        }
        await models.User.destroy({
            where: {
                id: id
            }
        });
        console.log('Usuario eliminado');
        return true;
    } catch (error) {
        throw new Error('Error al eliminar el usuario!', error);
    }
}

//MODIFICAR USUARIO
const modificarUsuario = async (id, body) => {
    try {
        const usuario = await models.User.findByPk(id);
        console.log(usuario);

        if (!usuario) {
            throw new Error('No se encontró el usuario');
        }
        await models.User.update(body, {
            where: {
                id: id
            }
        });
        const usuarioActualizado = await models.User.findByPk(id);
        return usuarioActualizado;
    } catch (error) {
        throw new Error('Error al modificar el usuario!', error);
    }
}


module.exports = {
    login,
    registro,
    cambiarPassword,
    altaUsuario,
    bajaUsuario,
    modificarUsuario,
    getUsuarios
}