const express = require('express');

const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const typeDefs = require('../typeDefs/typeDefs.js');
const resolvers = require('../resolvers/resolvers.js');

class Server {

    constructor() {
        this.app = express();
        //this.usuariosPath = '/api';
        this.graphQLPath = '/graphql';

        //Middlewares
        this.middlewares();

        this.serverGraphQL = new ApolloServer({
            typeDefs, resolvers, formatError: (error) => {
                // Devuelve solo el mensaje del error y no el volcado de toda la excepción GraphQL.
                return { message: error.message };
            }
        });

        //this.routes();
        
    }

    async start() {
        await this.serverGraphQL.start();
        this.applyGraphQLMiddleware();
        this.listen();
    }  

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

    }

    applyGraphQLMiddleware() {
        this.app.use(this.graphQLPath , express.json(), expressMiddleware(this.serverGraphQL));
    }

    /*routes(){
        this.app.use(this.usuariosPath , require('../routes/usuarioRoutes'));
        this.app.use(this.usuariosPath , require('../routes/tareaRoutes'));
    }*/

    /*listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }*/

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.URL}:${process.env.PORT}${this.graphQLPath}`);
        })
    }

}

module.exports = Server;